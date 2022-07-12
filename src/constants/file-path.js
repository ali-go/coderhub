const AVATAR_PATH = "./uploads/avatar"; //头像存储路径
const PICRURE_PATH = "./uploads/picture"; //动态图片存储路径

// 注意当使用在koa-multer进行文件保存到本地时，上面的相对路径是相对于服务启动时的文件夹路径，并不是指相对该文件的路径
module.exports = {
  AVATAR_PATH,
  PICRURE_PATH,
};
