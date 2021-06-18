const { authMiddleware } = require("../middleware/auth");
const Newsletter = require("../db/models/newsletter");
const HttpException = require("../utils/error");
const { validate } = require("../middleware/bodyValidation");
const { emailValidator } = require("../utils/validations/email");

const router = require("express").Router();

router.delete("/", authMiddleware, async (req, res, next) => {
  try {
    const { email } = req.user;

    const deleted = await Newsletter.deleteOne({ email });

    if (!deleted.deletedCount) {
      throw new HttpException("Un subscription failed", 400);
    }

    return res
      .status(200)
      .json({ message: "You are unsubscribed from the newsletter" });
  } catch (error) {
    return next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { email } = req.user;

    const exist = await Newsletter.findOne({ email });

    if (exist) {
      throw new HttpException("You are already subscribed", 400);
    }

    await new Newsletter({ email }).save();

    return res
      .status(201)
      .json({ message: "You have successfully subscribed to the newsletter" });
  } catch (error) {
    return next(error);
  }
});

router.post(
  "/subscribe-guest",
  validate([emailValidator]),
  async (req, res, next) => {
    try {
      const { email } = req.body;

      const exist = await Newsletter.findOne({ email });

      if (exist) {
        throw new HttpException("Provided email is already subscribed", 400);
      }

      await new Newsletter({ email }).save();

      return res.status(201).json({
        message: "You have successfully subscribed to the newsletter",
      });
    } catch (error) {
      return next(error);
    }
  }
);

router.post(
  "/unsubscribe-guest",
  validate([emailValidator]),
  async (req, res, next) => {
    try {
      await Newsletter.deleteOne({ email: req.body.email });

      return res
        .status(200)
        .json({ message: "You are unsubscribed from the newsletter" });
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
