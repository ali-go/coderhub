// 声明：对密码加密
const crypto = require("crypto"); //node内置的插件

const md5Password = (password) => {
  // 注意：
  // 1.经测试此处password必须是String instance of Buffer, TypedArray, or DataView，否则下面加密会类型错误;
  // 2.并且不会主动抛出错误，需要自己try catch捕获；
  try {
    const md5 = crypto.createHash("md5");
    const result = md5.update(password).digest("hex");
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = md5Password;
