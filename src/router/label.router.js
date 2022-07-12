// 声明：标签的路由

const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { create, list } = require("../controller/label.controller.js");

const labelRouter = new Router({ prefix: "/label" });

// 添加标签
labelRouter.post("/", verifyAuth, create);
// 查询标签列表：（不需要权限认证）
labelRouter.get("/", list);

module.exports = labelRouter;
