const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
<<<<<<< HEAD
    // Hardcoded local MongoDB connection
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/chat-app", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
=======
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/chat-app");
    console.log(`MongoDB Connected to: ${conn.connection.host}`.cyan.underline);
>>>>>>> 652ec256d84570cee906d4d35137ee8de1053b07
  } catch (error) {
    console.log(`MongoDB Connection Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB; 