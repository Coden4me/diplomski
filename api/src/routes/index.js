const router = require("express").Router();
const AuthRoutes = require("./auth");
const ProductRoutes = require("./product");
const Newsletter = require("./newsletter");
const Userdata = require("./userData");
const Contact = require("./contact");
const Compare = require("./compare");

router.use("/auth", AuthRoutes);
router.use("/products", ProductRoutes);
router.use("/newsletter", Newsletter);
router.use("/user-data", Userdata);
router.use("/contact", Contact);
router.use("/compare", Compare);

module.exports = router;
