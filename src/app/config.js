// 全局的变量放在这里（.env文件的环境变量统一导出出口）
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

//执行完后就会自动把.env配置的自定义变量插入到process.env中
dotenv.config();

// console.log(process.env);

// 公私钥统一导出路口：
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/private.key"));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/public.key"));

// 导出
module.exports = { APP_PORT, MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } = process.env;
module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;
