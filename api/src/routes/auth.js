const { authMiddleware } = require("../middleware/auth");
const { passport, PassportService } = require("../utils/passport");
const cookie = require("../utils/cookie");
const jwt = require("../utils/jwt");
const env = require("../utils/env");

const router = require("express").Router();

router.post("/logout", (req, res) => {
  req.logOut();
  req.logout();
  cookie.removeRefreshToken(res);
  return res.status(200).json({ message: "success" });
});

router.get("/refresh", async (req, res) => {
  const check = req.query.firstCheck;
  try {
    const { _id, name, picture, email, isSubscribed } = await jwt.verifyToken(
      req.cookies[env.webToken.REFRESH_TOKEN_NAME],
      true
    );

    const tokenObj = { _id, name, picture, email, isSubscribed };

    cookie.setRefreshToken(res, jwt.signToken(tokenObj, true) || "");
    return res.status(200).json({ accessToken: jwt.signToken(tokenObj) });
  } catch {
    const status = check === "false" ? 401 : 200;
    return res.status(status).json({});
  }
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get("/google/callback", (req, res) =>
  new PassportService().socialCallback(req, res)
);

module.exports = router;
