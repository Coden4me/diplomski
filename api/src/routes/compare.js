const { authMiddleware } = require("../middleware/auth");
const Compare = require("../db/models/compare");
const mongoose = require("mongoose");
const HttpException = require("../utils/error");

const { Types } = mongoose;

const router = require("express").Router();

router.delete("/", authMiddleware, async (req, res, next) => {
  try {
    const { _id } = req.user;

    const find = await Compare.findOne({ userId: new Types.ObjectId(_id) });
    const id = new Types.ObjectId(req.body.id);

    if (!find.products.includes(id)) {
      throw new HttpException("Product is already in compare table", 400);
    }

    await Compare.findOneAndUpdate(
      { userId: new Types.ObjectId(_id) },
      { $pull: { products: id } }
    );

    const products = find.products.filter((p) => p.toString() !== req.body.id);

    return res.status(200).json({ products });
  } catch (error) {
    return next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const id = new Types.ObjectId(req.body.id);

    const find = await Compare.findOne({ userId: new Types.ObjectId(_id) });

    if (find.products.includes(id)) {
      throw new HttpException("Product is already in compare table", 400);
    }

    if (find.products.length === 3) {
      throw new HttpException(
        "You can only compare up to 3 products at the same time",
        400
      );
    }

    const updated = await Compare.findOneAndUpdate(
      { userId: new Types.ObjectId(_id) },
      { $push: { products: id } }
    );

    return res.status(201).json({ products: [...updated.products, id] });
  } catch (error) {
    return next(error);
  }
});

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const { _id } = req.user;

    const find = await Compare.findOne({
      userId: new Types.ObjectId(_id),
    }).populate("products");

    return res.status(200).json({ products: find.products });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
