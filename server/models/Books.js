const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  description: {
    type: String,
  },
  image_url: {
    type: String,
  },
  genre: {
    type: [String],
  },
  copies: {
    type: String,
  },
});

module.exports = mongoose.model("Books", BooksSchema)