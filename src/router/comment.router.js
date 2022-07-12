// 声明：评论的路由
const Router = require("koa-router");
const { create, reply, update, remove, list } = require("../controller/comment.controller");
const { verifyAuth, verifyPermission } = require("../middleware/auth.middleware");

const commentRouter = new Router({ prefix: "/comment" });

// 发表评论：
commentRouter.post("/", verifyAuth, create);
commentRouter.post("/:commentId/reply", verifyAuth, reply); //回复评论的评论

// 1.需要登录；2.需要权限认证；
// 修复评论
commentRouter.patch("/:commentId", verifyAuth, verifyPermission, update);
// 删除评论
commentRouter.delete("/:commentId", verifyAuth, verifyPermission, remove);

// 获取评论列表(query传参momentId)
commentRouter.get("/", list);

module.exports = commentRouter;
