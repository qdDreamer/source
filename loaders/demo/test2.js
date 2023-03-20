//异步loader
module.exports=function(content,map,meta){
    //执行异步loader先调用async方法
    const callback=this.async();

    //执行异步
    setTimeout(() => {
        // callback什么时候执行完，异步loader就什么时候执行完，就会执行下一个loader
        console.log('test2',content);
    }, 1000);
}