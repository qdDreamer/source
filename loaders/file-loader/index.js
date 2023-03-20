const loaderUtils = require("loader-utils");
module.exports = function (content) {
    //根据文件内容生成hash值的文件名
    // 根据文件内容生产一个新的文件名称
    const filename = loaderUtils.interpolateName(this, "[hash].[ext][query]", {
        content,
    });
    //将文件输出去
    this.emitFile(filename, content);
    //返回 module.exports="文件路径（文件名）"
    return `module.exports='${filename}'`;
}

//需要处理图片、字体等文件。他们都是buffer数据
//需要使用raw loader才能处理
module.exports.raw = true