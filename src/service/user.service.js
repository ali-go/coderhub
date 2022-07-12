// 与user相关的数据库交互操作：注意此处使用async和await
const connection = require("../app/database");

class UserService {
  // 创建用户：
  async create(user) {
    const { name, password } = user;
    const statement = `INSERT INTO user (name,password) VALUES(?,?);`;
    const result = await connection.execute(statement, [name, password]);

    //result本身是[result,fields]
    return result[0];
  }
  // 根据用户名获取用户：
  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`;
    const result = await connection.execute(statement, [name]);

    return result[0];
  }
  // 更新头像地址：
  async updateAvatarUrlById(avatarUrl, userId) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    return result;
  }
}

module.exports = new UserService();
