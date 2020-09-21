const mongoose = require("mongoose");
const config = require("config");

const connectionString = config.get("mongoUri");

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected...");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
