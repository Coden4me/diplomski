const env = require("./env");

const { webToken } = env;

const refreshOptions = {
  httpOnly: true,
  path: webToken.REFRESH_TOKEN_PATH,
  sameSite: "lax",
  secure: false,
  domain: undefined,
};

module.exports = {
  setRefreshToken: (res, token) => {
    res.cookie(webToken.REFRESH_TOKEN_NAME, token, refreshOptions);
  },
  removeRefreshToken: (res) => {
    res.cookie(webToken.REFRESH_TOKEN_NAME, "", refreshOptions);
  },
};
