const env = require("./env");

const { webToken, isProduction } = env;

const refreshOptions = {
  httpOnly: true,
  path: webToken.REFRESH_TOKEN_PATH,
  sameSite: isProduction ? 'none' :"lax",
  secure: isProduction,
};

module.exports = {
  setRefreshToken: (res, token) => {
    res.cookie(webToken.REFRESH_TOKEN_NAME, token, refreshOptions);
  },
  removeRefreshToken: (res) => {
    res.cookie(webToken.REFRESH_TOKEN_NAME, "", refreshOptions);
  },
};
