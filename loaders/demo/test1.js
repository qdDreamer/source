//同步loader
/* 如果只需要
module.exports=function(content,map,meta){
    return content
} 
*/
module.exports=function(content,map,meta){
    console.log('test1');
    /* 
        第一个参数：err 代表是否有错误
        第二个参数：content处理后的内容
        第三个参数：sourceMap 继续传递source-map
        第四个参数：meta 给下一个loader传递参数

        注意：在同步loader中，不能执行异步，因为会直接跳过，去下一个loader，不会等该异步执行完，等异步执行完在调用就会报错
    */
 /*   setTimeout(()=>{
    this.callback(null,content,map,meta)
   }) */


    this.callback(null,content,map,meta)
}