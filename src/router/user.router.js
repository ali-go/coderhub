// 配置user的路由
const Router = require("koa-router");
const { create, avatarInfo } = require("../controller/user.controller");
const { verifyUser, handlePassword } = require("../middleware/user.middleware.js");
const userRouter = new Router({ prefix: "/users" });

// 由于创建的逻辑还是比较多的，我们可以把具体行为抽离:

// 1.创建用户：（verifyUser为校验用户名和密码的中间件,handlePassword为对密码加密）
userRouter.post("/", verifyUser, handlePassword, create);
// 获取用户头像：
userRouter.get("/:userId/avatar", avatarInfo);

module.exports = userRouter;
