const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    enum: ["member", "librarian", "admin"],
  },
},
{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
