const { authMiddleware } = require("../middleware/auth");
const Product = require("../db/models/product");
const mongoose = require('mongoose');

const { Types } = mongoose;

const router = require("express").Router();

router.get("/landing/:category", async (req, res, next) => {
  try {
    const { category } = req.params;

    const products = await Product.aggregate([
      { $match: { category: category.toLowerCase() } },
      { $sample: { size: 8 } },
      {
        $project: {
          name: 1,
          img1: "$konzum.image",
          img2: "$amko.image",
          img3: "$ebios.image",
        },
      },
    ]);

    return res.status(200).json({ products });
  } catch (error) {
    return next(error);
  }
});

router.get("/product/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(
      id,
      "name category konzum amko ebios"
    );

    const similarProducts = await Product.aggregate([
      { $match: { category: product.category, _id: { $ne: new Types.ObjectId(id) } } },
      { $sample: { size: 8 } },
      {
        $project: {
          name: 1,
          img1: "$konzum.image",
          img2: "$amko.image",
          img3: "$ebios.image",
        },
      },
    ]);

    return res.status(200).json({ product, similarProducts });
  } catch (error) {
    return next(error);
  }
});

router.get("/search/:categories/:sale/:skip", async (req, res, next) => {
  try {
    const parsedCategories = JSON.parse(req.params.categories);
    let categories =
      !parsedCategories || !parsedCategories.length
        ? [
            "voće",
            "povrće",
            "brašno",
            "suho voće",
            "bezalkoholna pića",
            "alkoholna pića",
          ]
        : parsedCategories;

    const sale = JSON.parse(req.params.sale);
    const skip = JSON.parse(req.params.skip);

    const rules = [{ category: { $in: categories } }];

    const project = {
      name: 1,
      category: 1,
      img1: "$konzum.image",
      img2: "$amko.image",
      img3: "$ebios.image",
    };

    if (sale) {
      const or = [
        { "konzum.oldPrice": { $ne: null } },
        { "amko.oldPrice": { $ne: null } },
        { "ebios.oldPrice": { $ne: null } },
      ];

      rules.push({ $or: or });
    }

    const rsp = await Product.aggregate([
      {
        $facet: {
          products: [
            { $match: { $and: rules } },
            { $skip: skip },
            { $limit: 12 },
            { $project: project },
          ],
          totalCount: [
            {
              $count: "count",
            },
          ],
        },
      },
      {
        $project: {
          totalCount: 1,
          products: 1,
        },
      },
    ]);

    const { products, totalCount } = rsp[0];

    return res.status(200).json({ products, count: totalCount?.[0].count ?? 0 });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
