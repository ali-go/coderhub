const connection = require("../app/database");

class LabelService {
  // 新增：
  async create(name) {
    const statament = `INSERT INTO label (name) VALUES(?);`;
    const [result] = await connection.execute(statament, [name]);
    return result;
  }
  // 根据name查询标签
  async getLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?;`;
    const [result] = await connection.execute(statement, [name]);
    return result[0];
  }
  // 获取标签列表：
  async list(offset, size) {
    const statement = `SELECT * FROM label LIMIT ?, ?;`;
    const [result] = await connection.execute(statement, [offset, size]);
    return result;
  }
}

module.exports = new LabelService();
