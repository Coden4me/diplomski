const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const productSchema = new Schema({
  konzum: {
    qty: {
      type: String,
      required: true,
      default: null,
    },
    price: {
      type: Number,
      required: true,
      default: null,
    },
    oldPrice: {
      type: Number,
      required: true,
      default: null,
    },
    until: {
      type: String,
      required: true,
      default: null,
    },
    image: {
      type: String,
      required: true,
      default: null,
    },
    available: {
      type: Boolean,
      required: true,
      default: null,
    },
  },
  amko: {
    qty: {
      type: String,
      required: true,
      default: null,
    },
    price: {
      type: Number,
      required: true,
      default: null,
    },
    oldPrice: {
      type: Number,
      required: true,
      default: null,
    },
    until: {
      type: String,
      required: true,
      default: null,
    },
    image: {
      type: String,
      required: true,
      default: null,
    },
    available: {
      type: Boolean,
      required: true,
      default: null,
    },
  },
  ebios: {
    qty: {
      type: String,
      required: true,
      default: null,
    },
    price: {
      type: Number,
      required: true,
      default: null,
    },
    oldPrice: {
      type: Number,
      required: true,
      default: null,
    },
    until: {
      type: String,
      required: true,
      default: null,
    },
    image: {
      type: String,
      required: true,
      default: null,
    },
    available: {
      type: Boolean,
      required: true,
      default: null,
    },
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = model("Product", productSchema);
