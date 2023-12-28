const mongoose = require("mongoose");

const BookCopySchema = new mongoose.Schema(
  {
    number: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Available", "Checked out", "Reserved"],
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookCopy", BookCopySchema);
