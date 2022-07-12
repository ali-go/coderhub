// 声明：koa中间件抛出的错误统一处理

const errorTypes = require("../constants/error-types");

const errorHandler = (error, ctx) => {
  let status, message;

  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = "用户名或密码不能为空~";
      break;
    case errorTypes.USER_ALREADY_EXISIS:
      status = 409;
      message = "用户名已经存在~";
      break;
    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 400;
      message = "用户不存在~";
      break;
    case errorTypes.PASSWORD_IS_INCORRECT:
      status = 400;
      message = "密码错误~";
      break;
    case errorTypes.NOT_AUTHORIZATION:
      status = 401;
      message = "无效的token~";
      break;
    case errorTypes.UNPERMISSION:
      status = 401;
      message = "没有修改权限~";
      break;
    case errorTypes.ADD_LABEL_FAIL:
      status = 400;
      message = "标签新增失败~";
      break;
    default:
      status = 404;
      message = "NOT FOUND~";
  }
  ctx.status = status;
  ctx.body = message;
};

module.exports = errorHandler;
