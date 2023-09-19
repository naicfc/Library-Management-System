const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  number: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Availlable", "Checked out", "Reserved"],
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Books",
  },
});

module.exports = mongoose.model("Book", BookSchema);
