//row loader ：可以接收到content是Buffer数据，比如进行处理图片、字体、图标等
module.exports=function(content,map ,meta){
    console.log(content);
    //可以写同步和异步写法
    return content
}

//row loader需要在函数中添加一个属性raw，并将设置为true
module.exports.raw=true