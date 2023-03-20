/*
  1. webpack加载webpack.config.js中所有配置，此时就会new TestPlugin(), 执行插件的constructor
  2. webpack创建compiler对象
  3. 遍历所有plugins中插件，调用插件的apply方法
  4. 执行剩下编译流程（触发各个hooks事件）
*/

class TestPlugin {
    constructor() {
        console.log("TestPlugin constructor");
    }

    apply(compiler) {
        console.log("TestPlugin apply");
        // 从文档可知, compile hook 是 SyncHook, 也就是同步钩子, 只能用tap注册
        compiler.hooks.compile.tap("TestPlugin", (compilationParams) => {
            console.log("compiler.compile()");
        });

        // 从文档可知, emit 是 AsyncSeriesHook, 也就是异步--串行钩子，特点就是异步任务--顺序执行
        compiler.hooks.emit.tap("TestPlugin", (compilation, callback) => {
            console.log("compilation",compilation);
            setTimeout(() => {
                console.log("compiler.emit() 111");
                callback();
            }, 3000);
        });

        compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback) => {
            setTimeout(() => {
                console.log("compiler.emit() 222");
                callback();
            }, 2000);
        });

        compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback) => {
            setTimeout(() => {
                console.log("compiler.emit() 333");
                callback();
            }, 1000);
        });

        // 从文档可知, make 是 AsyncParallelHook, 也就是异步--并行钩子, 特点就是异步任务--同时执行
        // 可以使用 tap、tapAsync、tapPromise 注册。
        // 如果使用tap注册的话，进行异步操作是不会等待异步操作执行完成的。
        compiler.hooks.make.tap("TestPlugin", (compilation) => {
            setTimeout(() => {
                console.log("compiler.make() 111");
            }, 2000);
        });

        // 使用tapAsync、tapPromise注册，进行异步操作会等异步操作做完再继续往下执行
        compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
            //需要在compilation hooks触发前注册才能使用（就是需要在make里面注册使用）
            compilation.hooks.seal.top("TestPlugin",()=>{
                console.log("TestPlugin seal");
            })
            setTimeout(() => {
                console.log("compiler.make() 222");
                // 必须调用
                callback();
            }, 1000);
        });

        compiler.hooks.make.tapPromise("TestPlugin", (compilation) => {
            console.log("compiler.make() 333");
            // 必须返回promise
            return new Promise((resolve) => {
                resolve();
            });
        });
    }
}

module.exports = TestPlugin