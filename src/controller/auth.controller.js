const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config"); //获取公私钥
class AuthController {
  // 登录：
  async login(ctx, next) {
    const { id, name } = ctx.user;
    // 生成token
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256",
    });

    ctx.body = {
      id,
      name,
      token,
    };
  }
  // 测试：
  async success(ctx, next) {
    ctx.body = "授权成功~";
  }
}

module.exports = new AuthController();
