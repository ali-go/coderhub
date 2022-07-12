// 声明：用户认证登录等的中间件检验
const errorTypes = require("../constants/error-types");
const userService = require("../service/user.service");
const authService = require("../service/auth.service");
const md5Password = require("../utils/password-handle");
const jwt = require("jsonwebtoken");

const { PUBLIC_KEY } = require("../app/config");

// 登录校验：
const verifyLogin = async (ctx, next) => {
  // 1.获取用户名和密码
  const { name, password } = ctx.request.body;

  // 2.判断用户名和密码是否为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  // 3.判断用户是否存在
  const result = await userService.getUserByName(name);
  const user = result[0];
  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  // 4.判断密码是否和数据库中的密码一致（加密）
  if (md5Password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRECT);
    return ctx.app.emit("error", error, ctx);
  }

  ctx.user = user; //后面生产token和校验需要用到user中的id和name，此处存一下
  await next();
};

// token校验：
const verifyAuth = async (ctx, next) => {
  // 获取token:
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error(errorTypes.NOT_AUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithm: ["RS265"],
    });
    ctx.user = result; //给下一个中间件获取用户id的
    await next();
  } catch (err) {
    const error = new Error(errorTypes.NOT_AUTHORIZATION);
    ctx.app.emit("error", error, ctx);
  }
};

// （公共）判断是否有权限：
/**
 * 1.很多内容都需要进行权限验证：动态修改/删除，评论修改/删除
 * 2.此处是一对一，但是后台系统会设置角色role多对多
 * 此处有两种方式封装成公共的：
 * （1）使用高阶函数柯里化，返回一个函数，在封装接口的地方传递表名参数;
 * （2）接口设计符合RESFful规范，则传参的数据id应该有表前缀，直接提取表名；
 * 此处暂时采用方式2
 */
const verifyPermission = async (ctx, next) => {
  // 1.获取参数：
  const [resourceKey] = Object.keys(ctx.params);
  const tableName = resourceKey.replace("Id", "");
  const userId = ctx.user.id;
  const id = ctx.params[resourceKey];
  // 2.查询是否具备权限：
  try {
    const isPremission = await authService.checkPermission(tableName, userId, id);
    if (!isPremission) throw new Error();
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNPERMISSION);
    ctx.app.emit("error", error, ctx);
  }
};

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
};
