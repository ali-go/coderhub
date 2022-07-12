// 声明：所有文件上传路由
const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { avatarHandler, pictureHandler, pictureResize } = require("../middleware/file.middleware");
const { saveAvatarInfo, savePictureInfo } = require("../controller/file.controller");

const fileRouter = new Router({ prefix: "/upload" });

// 头像上传：校验登录 + 保存头像文件到本地 + 文件数据存入数据库
fileRouter.post("/avatar", verifyAuth, avatarHandler, saveAvatarInfo);

// 动态图片上传：校验登录 + 保存头像文件到本地 + 保存其他尺寸的图片 + 文件数据存入数据库
fileRouter.post("/picture", verifyAuth, pictureHandler, pictureResize, savePictureInfo);

module.exports = fileRouter;
