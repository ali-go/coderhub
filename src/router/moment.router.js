// 声明：用户动态的路由
const Router = require("koa-router");
const { verifyAuth, verifyPermission } = require("../middleware/auth.middleware");
const { create, detail, list, update, remove, addLabels, fileInfo } = require("../controller/moment.controller.js");
const { verifyLabelExists } = require("../middleware/label.middleware");

const momentRouter = new Router({ prefix: "/moment" });

momentRouter.post("/", verifyAuth, create); //添加动态
momentRouter.get("/:momentId", detail); //查看单条动态：不需要登录，即不需要校验token
momentRouter.get("/", list); //查看全部动态：不需要校验token

// 1.用户必须登录；2.用户具备权限；
// 由于很多地方都需要判断权限，例如动态修改/删除，评论修改/删除...,该中间件封装公共的；

momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update); //修改动态
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove); //删除动态

momentRouter.post("/:momentId/labels", verifyAuth, verifyPermission, verifyLabelExists, addLabels); //动态添加标签

momentRouter.get("/images/:filename", fileInfo); //预览插图

module.exports = momentRouter;
