const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TestPlugin = require('./plugins/test-plugin')
const BannerWebpackPlugin = require('./plugins/banner-webpack-plugin')
const CleanWebpackPlugin=require('./plugins/clean-webpack-plugin')
const AnalyzeWebpackPlugin = require('./plugins/analyze-webpack-plugin')
const InlineChunkWebpackPlugin=require('./plugins/inline-chunk-webpack-plugin')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './js/[name].js',
        // assetModuleFilename: "./image/[name].[hash][ext]"
        // clean:true
    },
    module: {
        rules: [
            /* {
                test:/\.js$/,
                loader:'./loaders/test-loader.js'
            }, */
            {
                test: /\.js$/,
                // use:['./loaders/demo/test2','./loaders/demo/test1']
                // loader:'./loaders/demo/test3.js'
                // use:['./loaders/demo/test4.js','./loaders/demo/test5.js','./loaders/demo/test6.js']
                loader: './loaders/clean-log-loader.js'
            },
            /* {
                test:/\.js$/,
                loader:'./loaders/banner-loader/index.js',
                options:{
                    author:'坤坤'
                    // age:18 不能新增字段，要符合schema的规则，不然会报错
                }
            }, */
            {
                test: /\.js$/,
                loader: './loaders/babel-loader/index.js',
                options: {
                    presets: ["@babel/preset-env"]
                }
            },
            {
                test: /\.(png|webp|jpe?g|gif)$/,
                loader: './loaders/file-loader/index.js',
                type: "javascript/auto", // 解决图片重复打包问题，默认打包
            },
            {
                test: /\.css$/,
                // use:['style-loader','css-loader']
                use: ['./loaders/style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        }),
        // new TestPlugin(),添加注释 
        new BannerWebpackPlugin({
            author: '坤坤'
        }),
        new CleanWebpackPlugin(),
        new AnalyzeWebpackPlugin(),
        new InlineChunkWebpackPlugin([/runtime(.*)?\.js$/g])
    ],
    optimization: {
        // 代码分割配置
        splitChunks: {
            chunks: "all", // 对所有模块都进行分割
            // 其他内容用默认配置即可
        },
        // 提取runtime文件
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}`, // runtime文件命名规则
        },
    },
    mode: 'production'
}