const env = require("./env");

const { isProduction, webToken } = env;

const refreshOptions = {
  httpOnly: true,
  path: webToken.REFRESH_TOKEN_PATH,
  sameSite: "lax",
  secure: false,
  domain: isProduction ? "eager-rosalind-c761a8.netlify.app" : undefined,
};

module.exports = {
  setRefreshToken: (res, token) => {
    res.cookie(webToken.REFRESH_TOKEN_NAME, token, refreshOptions);
  },
  removeRefreshToken: (res) => {
    res.cookie(webToken.REFRESH_TOKEN_NAME, "", refreshOptions);
  },
};
