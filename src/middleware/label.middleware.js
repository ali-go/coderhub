const labelService = require("../service/label.service");
// 判断标签是否存在：
const verifyLabelExists = async (ctx, next) => {
  const { labels } = ctx.request.body;
  const newLabels = [];
  // 1.判断标签是否存在
  for (let name of labels) {
    const labelResult = await labelService.getLabelByName(name);
    let label = { name };
    if (!labelResult) {
      // 创建标签数据
      const result = await labelService.create(name);
      label.id = result.insertId;
    } else {
      label.id = labelResult.id;
    }
    newLabels.push(label);
  }
  ctx.labels = newLabels;
  await next();
};

module.exports = {
  verifyLabelExists,
};
