const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["member", "librarian", "admin"],
  },
});

module.exports = mongoose.model("User", UserSchema);
