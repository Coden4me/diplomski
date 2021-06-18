const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const newsletterSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Newsletter", newsletterSchema);
