const fs = require("fs");
const { PICRURE_PATH } = require("../constants/file-path");
const fileService = require("../service/file.service");
const momentService = require("../service/moment.service");

class MomentController {
  // 添加动态：
  async create(ctx, next) {
    // 1.获取数据：
    const userId = ctx.user.id;
    const content = ctx.request.body.content;
    // 2.插入到数据库：
    const result = await momentService.create(userId, content);
    ctx.body = result;
    next();
  }
  // 查看单条动态：
  async detail(ctx, next) {
    const { momentId } = ctx.request.params;
    const result = await momentService.getMomentById(momentId);
    ctx.body = result;
    next();
  }
  // 查看全部动态：需分页
  async list(ctx, next) {
    const { offset, size } = ctx.request.query;
    const result = await momentService.getMomentList(offset, size);
    ctx.body = result;
    next();
  }
  // 修改动态：
  async update(ctx, next) {
    const momentId = ctx.request.params.momentId;
    const content = ctx.request.body.content;
    const result = await momentService.update(momentId, content);
    ctx.body = result;
    next();
  }
  // 删除动态：
  async remove(ctx, next) {
    const momentId = ctx.request.params.momentId;
    const result = await momentService.remove(momentId);
    ctx.body = result;
    next();
  }
  // 动态添加标签：
  async addLabels(ctx, next) {
    const { labels } = ctx;
    const { momentId } = ctx.params;
    // 判断该动态是否追加过该标签
    for (let label of labels) {
      const isExists = await momentService.hasLabel(momentId, label.id);
      if (!isExists) {
        await momentService.addLabel(momentId, label.id);
      }
    }
    ctx.body = "动态添加标签成功~";
  }
  // 预览插图：（根据是否有type值确定预览的图片尺寸）
  async fileInfo(ctx, next) {
    let { filename } = ctx.params;
    const fileInfo = await fileService.getFileByFilename(filename);
    const { type } = ctx.query;
    const types = ["large", "middle", "small"];
    if (types.some((item) => item === type)) {
      filename = filename + "-" + type;
    }
    ctx.response.set("content-type", fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICRURE_PATH}/${filename}`);
  }
}

module.exports = new MomentController();
