const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    // Hardcoded local MongoDB connection
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/chat-app", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`MongoDB Connection Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB; 