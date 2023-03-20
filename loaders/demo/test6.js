module.exports=function(content){
    console.log('test 3');
    return content
}

//pitch loader添加一个pitch函数，执行顺序是执行pitch函数再执行loader，且pitch之间的执行顺序是与loader之间相反，
//但是，如果某个pitch函数执行了return，后面的loader包括本身的loader都不执行，直接执行前面的loader的
module.exports.pitch=function(){
    console.log('pitch 3');
}