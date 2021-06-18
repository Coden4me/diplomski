const HttpException = require("../utils/error");

module.exports.errorHandle = (error, _, res, __) => {
  if (error instanceof HttpException) {
    return res.status(error.getCode()).json(error.getResponse());
  }

  return res
    .status(500)
    .json({ message: "Internal server error" });
};
