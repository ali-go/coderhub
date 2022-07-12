// 所有用户请求接口的中间件回调行为函数（单独抽离）
const fs = require("fs");
const userService = require("../service/user.service"); //导入操作数据库的类
const fileService = require("../service/file.service"); //导入操作数据库的类
const { AVATAR_PATH } = require("../constants/file-path");

class UserController {
  // 创建用户：里面的数据库交互操作依旧抽离
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body;
    // 保存数据
    const result = await userService.create(user);
    // 返回数据
    ctx.body = result;
  }
  // 获取用户头像：
  async avatarInfo(ctx, next) {
    // 1.获取用户的头像信息
    const { userId } = ctx.params;
    const avatarInfo = await fileService.getAvatarByUserId(userId);
    // 此处必须要设置响应类型，否则用户浏览器打开图片文件时识别不到后缀会自动下载，我们只需要预览即可
    ctx.response.set("content-type", avatarInfo.mimetype);
    // 2.获取头像文件
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
  }
}

module.exports = new UserController();
