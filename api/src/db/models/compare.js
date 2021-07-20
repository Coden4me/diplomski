const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const compareSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
      default: null,
      
    },
  ],
});

module.exports = model("Compare", compareSchema);
