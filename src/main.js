const app = require("./app/index"); //导入统一的app
require("./app/database"); //目的让该文件建立mysql连接
const config = require("./app/config"); //统一配置.evn环境变量

app.listen(config.APP_PORT, () => {
  console.log("8888服务器启动成功");
});
