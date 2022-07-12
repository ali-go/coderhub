// 全局的app放在该文件
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const useRoutes = require("../router");
const errorHandler = require("../app/error-handle");

const app = new Koa();

app.use(bodyParser());
// 注册users的路由
// useRoutes(app); //方式一：接收app参数
app.useRoutes = useRoutes;
app.useRoutes(); //方式二：把useRoutes方法挂载到app属性上，格式好看点

// 捕获错误
app.on("error", errorHandler);

module.exports = app;
