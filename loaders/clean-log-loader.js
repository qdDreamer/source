//自定义清除console.log的loader
module.exports=function(content){
    return content.replace(/console.log\(.*\);?/g,"")
}