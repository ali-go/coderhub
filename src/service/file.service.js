// 声明：文件存表
const connection = require("../app/database");
class FileService {
  // 添加头像信息：
  async createAvatar(filename, mimetype, size, userId) {
    // 设置如果表中有user_id数据则更新原数据，否则插入新数据
    const statement = `
				INSERT INTO avatar (filename, mimetype, size, user_id) VALUES(?, ?, ?, ?)
				ON DUPLICATE KEY UPDATE filename = VALUES(filename), mimetype = VALUES(mimetype), size = VALUES(size), user_id = VALUES(user_id);
			`;
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId]);
    return result;
  }
  // 根据用户id获取头像信息：
  async getAvatarByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`;
    const [result] = await connection.execute(statement, [userId]);
    return result[0];
  }
  // 存储动态插图：
  async createFile(filename, mimetype, size, userId, momentId) {
    const statement = `INSERT INTO file (filename, mimetype, size, user_id, moment_id) VALUES(?, ?, ?, ?, ?);`;
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId, momentId]);
    return result;
  }
  // 根据filename获取插图：
  async getFileByFilename(filename) {
    const statement = `SELECT * FROM file	WHERE filename = ?;`;
    const [result] = await connection.execute(statement, [filename]);
    return result[0];
  }
}

module.exports = new FileService();
