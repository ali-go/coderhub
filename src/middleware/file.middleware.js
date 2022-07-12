// 声明：保存文件到本地的中间件
const path = require("path");
const Multer = require("koa-multer");
const Jimp = require("jimp");
const { AVATAR_PATH, PICRURE_PATH } = require("../constants/file-path");

// 1.头像保存模块----（此处未使用storage模式，dest已经够用）
const avatarUpload = Multer({
  dest: AVATAR_PATH,
});
const avatarHandler = avatarUpload.single("avatar"); //指定了上传键名叫avatar

// 2.动态图片模块：
const pictureUpload = Multer({
  dest: PICRURE_PATH,
});
const pictureHandler = pictureUpload.array("picture", 9);
// 处理保存多种尺寸图片（此处使用jimp插件，当然也可以使用sharp插件）
const pictureResize = async (ctx, next) => {
  const files = ctx.req.files;
  for (let file of files) {
    // 获取完整路径
    const destPath = path.join(file.destination, file.filename);
    // 考虑到性能，此处无需阻塞
    Jimp.read(file.path).then((image) => {
      image.resize(1200, Jimp.AUTO).write(`${destPath}-large`);
      image.resize(640, Jimp.AUTO).write(`${destPath}-middle`);
      image.resize(320, Jimp.AUTO).write(`${destPath}-small`);
    });
  }
  await next();
};

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize,
};
