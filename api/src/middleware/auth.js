const jwt = require("../utils/jwt");

const returnUnAuthorizedRequest = (res) =>
  res.status(401).json({ message: "Unauthorized request." });

module.exports.authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : "";

  if (!token) return returnUnAuthorizedRequest(res);

  try {
    const decoded = jwt.verifyToken(token);

    req.user = { ...decoded };
  } catch (err) {
    return returnUnAuthorizedRequest(res);
  }

  return next();
};
