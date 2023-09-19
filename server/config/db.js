const mongoose = require("mongoose");
const mongo_uri = process.env.MONGO_URI;

const connectDB = async () => {
  const conn = await mongoose.connect(mongo_uri);
  console.log(`MongoDB connected: ${conn.connection.host} `);
};

module.exports = connectDB;
