const { authMiddleware } = require("../middleware/auth");
const Newsletter = require("../db/models/newsletter");
const Compare = require("../db/models/compare");
const mongoose = require("mongoose");

const { Types } = mongoose;

const router = require("express").Router();

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const { email, _id } = req.user;
    const newsletter = await Newsletter.findOne({ email });
    const compare = await Compare.findOne({
      userId: new Types.ObjectId(_id),
    });

    return res
      .status(200)
      .json({
        isSubscribed: !!newsletter,
        compareProducts: compare?.products ?? [],
      });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
