const mongoose = require("mongoose");

const ReservedBookSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reservation_date: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Cancelled"],
  },
});

module.exports = mongoose.model("ReservedBook", ReservedBookSchema);
