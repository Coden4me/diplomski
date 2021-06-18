const env = require("./env");

const { isProduction, webToken } = env;

const refreshOptions = {
  httpOnly: true,
  path: webToken.REFRESH_TOKEN_PATH,
  sameSite: "strict",
  secure: isProduction,
  domain: isProduction ? ".print-shop-burch.com" : undefined,
};

module.exports = {
  setRefreshToken: (res, token) => {
    res.cookie(webToken.REFRESH_TOKEN_NAME, token, refreshOptions);
  },
  removeRefreshToken: (res) => {
    res.cookie(webToken.REFRESH_TOKEN_NAME, "", refreshOptions);
  },
};
