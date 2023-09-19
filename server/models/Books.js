const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  descripton: {
    type: String,
  },
  image_url: {
    type: String,
  },
  genreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genre"
  },
  copies: {
    type: String,
  },
});

module.exports = mongoose.model("Books", BooksSchema)