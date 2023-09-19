const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rating: {
      type: String,
      enum: ["1", "2", "3", "4", "5"],
    },
    review: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ratings", RatingSchema);
