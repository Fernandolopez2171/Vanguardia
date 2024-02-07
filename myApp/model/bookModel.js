const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BookSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: String,
  author: String,
  num_pages: Number,
  date_published: Date,
  publisher: String, //editorial
  isbn: String,
  gender: String,
  comments: String,
  edition: String,
});

const shelfSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  position: String,
  category: String,
  booksID: [{ type: Number, ref: "books" }],
});

const book = mongoose.model("books", BookSchema);
const shelf = mongoose.model("shelfs", shelfSchema);
module.exports = { book, shelf };
