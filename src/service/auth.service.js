// 声明：用户权限相关交互
const connection = require("../app/database");
class AuthService {
  // 核实是否有权限：
  async checkPermission(tableName, userId, id) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`;
    const [result] = await connection.execute(statement, [id, userId]);
    return result.length === 0 ? false : true;
  }
}

module.exports = new AuthService();
