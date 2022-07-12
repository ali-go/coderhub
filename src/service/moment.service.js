// 声明：用户动态交互数据
const connection = require("../app/database");
// 公共sql代码片段：
// const sqlFrament = `
// 	SELECT
// 		m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
// 		JSON_OBJECT('id',u.id, 'name', u.name) author,
// 		JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'content', c.content, 'userId', c.user_id)) comment
// 	FROM moment m
// 	LEFT JOIN user u ON m.user_id = u.id
// 	LEFT JOIN comment c ON m.id = c.moment_id
// `;
class momentService {
  // 添加：
  async create(userId, content) {
    const statement = `INSERT INTO moment (content,user_id) VALUES(?,?);`;
    const [result] = await connection.execute(statement, [content, userId]);
    return result;
  }
  // 单条查询：（此处我们会同时获取评论的数据，如果想单独查评论的数据，也可直接使用comment中定义的list接口）
  // 建议不要把太多信息丢在一个接口，如下面，sql会很复杂
  async getMomentById(momentId) {
    const statement = `
			SELECT
				m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
				JSON_OBJECT('id',u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author,
				IF(COUNT(l.id),JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name)),NULL) labels,
				(SELECT 
					IF(COUNT(c.id),
						JSON_ARRAYAGG(
							JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt, 'udpateTime', c.createAt,
								'user', JSON_OBJECT('id',us.id, 'name', us.name, 'avatarUrl', us.avatar_url)
							)
						)
					,NULL) FROM comment c LEFT JOIN user us ON c.user_id = us.id WHERE c.moment_id = m.id
				) comments,
			(SELECT JSON_ARRAYAGG(JSON_OBJECT('filename', CONCAT('/moment/images/',f.filename))) FROM file f WHERE f.moment_id = m.id) files
			FROM moment m
			LEFT JOIN user u ON m.user_id = u.id
			LEFT JOIN moment_label ml ON ml.moment_id = m.id
			LEFT JOIN label l ON l.id = ml.label_id 
			WHERE m.id = ?;
		`;
    const [result] = await connection.execute(statement, [momentId]);
    return result[0];
  }
  // 全部：
  async getMomentList(offset, size) {
    const statement = `
			SELECT 
				m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
				JSON_OBJECT('id',u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author,
				(SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
				(SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id ) labelCount
			FROM moment m
			LEFT JOIN user u ON m.user_id = u.id
			LIMIT ?, ?;
		`;
    const [result] = await connection.execute(statement, [offset, size]);
    return result;
  }
  // 修改：
  async update(momentId, content) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?`;
    const [result] = await connection.execute(statement, [content, momentId]);
    return result;
  }
  // 删除：
  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
  // 判断是否有该标签：
  async hasLabel(momentId, labelId) {
    console.log(momentId, labelId);
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result[0] ? true : false;
  }
  // 选择标签：
  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES(?, ?);`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result;
  }
}

module.exports = new momentService();
