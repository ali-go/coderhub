// 声明：文件信息存数据库交互(注意koa-multer上传的文件是存在ctx.req.file/files中的，而不是koa自带的request中)
const fileService = require("../service/file.service");
const userService = require("../service/user.service");
class FileController {
  // 头像文件信息入表：
  async saveAvatarInfo(ctx, next) {
    //提取需要存储到数据库的信息：
    // a.filename可以用来fs查询到本地文件给用户预览；
    // b.mimetype需要到时候设置ctx.body的content-type保证用户浏览器识别文件类型，进行预览而不是直接下载；

    // 1.获取文件信息
    const { filename, mimetype, size } = ctx.req.file;
    const { id } = ctx.user;
    // 2.将图片信息保存到数据库中
    const result = await fileService.createAvatar(filename, mimetype, size, id);
    // 3.将图片地址保存到user用户表中
    // 注意：
    // （1）为了方便后续跳整，该地址不拼接域名和端口，前端需要预览可自行拼接域名端口;
    // （2）为了避免服务器文件夹路径泄露，存储的地址为封装的预览接口地址，跳转该地址会自动请求文件；
    const avatarUrl = `/users/${id}/avatar`;
    await userService.updateAvatarUrlById(avatarUrl, id);
    ctx.body = "头像上传成功";
  }

  // 动态图片信息入表：(注意插图的地址不再追加到动态表数据中，查询动态表时采用子查询带出插图表的数据即可)
  async savePictureInfo(ctx, next) {
    // 要求query必传momentId动态id
    // 1.获取入表参数
    const files = ctx.req.files;
    const { momentId } = ctx.query;
    const { id } = ctx.user;
    for (let file of files) {
      const { filename, mimetype, size } = file;
      await fileService.createFile(filename, mimetype, size, id, momentId);
    }
    ctx.body = "图片上传成功";
  }
}

module.exports = new FileController();
