const connection = require("../app/database");

class CommentService {
  // 新增：
  async create(userId, momentId, content) {
    const statament = `INSERT INTO comment(content, user_id, moment_id) VALUES(?, ?, ?);`;
    const [result] = await connection.execute(statament, [content, userId, momentId]);
    return result;
  }
  // 回复：
  async reply(userId, momentId, commentId, content) {
    const statament = `INSERT INTO comment(content, user_id, moment_id, comment_id) VALUES(?, ?, ?, ?);`;
    const [result] = await connection.execute(statament, [content, userId, momentId, commentId]);
    return result;
  }
  // 修改：
  async update(commentId, content) {
    const statament = `UPDATE comment SET content = ? WHERE id = ?;`;
    const [result] = await connection.execute(statament, [content, commentId]);
    return result;
  }
  // 删除：
  async remove(commentId) {
    const statament = `DELETE FROM comment WHERE id = ?;`;
    const [result] = await connection.execute(statament, [commentId]);
    return result;
  }
  // 列表：
  // 注意：
  // 1.此处是动态和评论接口分开获取，所以定义一个单独评论列表的接口；
  // 2.我们也可以直接在动态接口获取评论数据，不过这样sql语句就会复杂化；
  // 3.实际开发最好分开，两个接口，当然我们等下会在那边联合查询；
  async getCommentByMomentId(momentId) {
    const statement = `
			SELECT 
				c.id id, c.content content, c.createAt createTime, c.updateAt updateTime,
				JSON_OBJECT('id', u.id, 'name', u.name) user
			FROM comment c
			LEFT JOIN user u ON c.user_id = u.id
			WHERE moment_id = ?;
		`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
}

module.exports = new CommentService();
