// 声明：校验user用户名和密码的中间件

const service = require("../service/user.service");
const errorTypes = require("../constants/error-types");
const md5Password = require("../utils/password-handle.js");

// 检验是否为空及是否注册过：
const verifyUser = async (ctx, next) => {
  // 1.获取用户名和密码
  const { name, password } = ctx.request.body;
  // 2.判断用户名和密码都不为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx); //抛出错误
  }

  // 3.判断此次注册的用户名未被注册过
  const result = await service.getUserByName(name);
  if (result.length) {
    const error = new Error(errorTypes.USER_ALREADY_EXISIS);
    return ctx.app.emit("error", error, ctx); //抛出错误
  }

  await next(); //为了处理异步等待next的问题，用await
};

// 对密码进行加密：
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5Password(password);
  await next();
};

module.exports = {
  verifyUser,
  handlePassword,
};
