const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const userSchema = new Schema(
  {
    googleID: {
      type: String,
      required: true,
      unique: true,
    },
    picture: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/halcika/image/upload/v1601248708/blank-user-img.jpg",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    }
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
