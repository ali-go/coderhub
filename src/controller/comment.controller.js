const commentService = require("../service/comment.service");
class CommentController {
  // 新增动态的评论：
  async create(ctx, next) {
    console.log("正在新增评论~");
    const userId = ctx.user.id;
    const { momentId, content } = ctx.request.body;
    const result = await commentService.create(userId, momentId, content);
    ctx.body = result;
  }
  // 回复评论的评论：
  async reply(ctx, next) {
    console.log("正在回复评论~");
    const userId = ctx.user.id;
    const { commentId } = ctx.params;
    const { momentId, content } = ctx.request.body;
    const result = await commentService.reply(userId, momentId, commentId, content);
    ctx.body = result;
  }
  // 修改评论：
  async update(ctx, next) {
    console.log("正在修改评论~");
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await commentService.update(commentId, content);
    ctx.body = result;
  }
  // 删除评论：
  async remove(ctx, next) {
    console.log("正在删除评论~");
    const { commentId } = ctx.params;
    const result = await commentService.remove(commentId);
    ctx.body = result;
  }
  // 获取评论列表:
  async list(ctx, next) {
    const { momentId } = ctx.query;
    const result = await commentService.getCommentByMomentId(momentId);
    ctx.body = result;
  }
}

module.exports = new CommentController();
