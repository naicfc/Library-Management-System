const mongoose = require("mongoose");

const BorrowedBookSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    borrow_date: {
      type: String,
    },
    due_date: {
      type: String,
    },
    return_date: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BorrowedBook", BorrowedBookSchema);
