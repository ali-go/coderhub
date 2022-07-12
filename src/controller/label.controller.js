const labelService = require("../service/label.service.js");
const errorTypes = require("../constants/error-types");
class LabelController {
  // 新增标签：
  async create(ctx, next) {
    try {
      const { name } = ctx.request.body;
      const result = await labelService.create(name);
      ctx.body = result;
    } catch (err) {
      const error = new Error(errorTypes.ADD_LABEL_FAIL);
      ctx.app.emit("error", error, ctx);
    }
  }

  // 获取列表：
  async list(ctx, next) {
    console.log("当前正在查看标签列表~");
    const { offset, size } = ctx.query;
    const result = await labelService.list(offset, size);
    ctx.body = result;
  }
}

module.exports = new LabelController();
