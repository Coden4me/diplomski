const mongoose = require("mongoose");

module.exports.connect = async (MONGO_URL) => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Database connected", "create-db-connection");
  } catch (error) {
    console.error("🚀 ~ file: db-connect.js ~ line 7 ~ error", error);
  }
};
