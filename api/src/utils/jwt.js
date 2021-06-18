const jwt = require("jsonwebtoken");
const env = require("./env");

class JWTService {
  static #access_secret = env.webToken.ACCESS_SECRET;

  static #refresh_secret = env.webToken.REFRESH_SECRET;

  constructor() {
    throw new Error("Class should not be instantiated");
  }

  static getSecret(refresh) {
    return !refresh ? JWTService.#access_secret : JWTService.#refresh_secret;
  }

  static getExpires(refresh) {
    return !refresh ? "15m" : "7d";
  }

  static verifyToken(token, refresh = false) {
    try {
      return jwt.verify(token, JWTService.getSecret(refresh));
    } catch {
      throw new Error({ message: "Invalid token..." });
    }
  }

  static signToken(payload, refresh = false) {
    return jwt.sign(payload, JWTService.getSecret(refresh), {
      expiresIn: JWTService.getExpires(refresh),
    });
  }
}

module.exports = JWTService;
