// 声明：统一连接数据库
const mysql = require("mysql2");
const { MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } = require("./config");

const connection = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
});

connection.getConnection((err, conn) => {
  conn.connect((err) => {
    if (err) {
      console.log("数据库连接失败", err);
    } else {
      console.log("数据库连接成功");
    }
  });
});

// 为了使用promise此处导出时调用.promise()
module.exports = connection.promise();
