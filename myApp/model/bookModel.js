const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  author: String,
  num_pages: Number,
  date_published: Date,
  publisher: { type: String, require: true }, //editorial
  isbn: { type: String, require: true }, //ISBN
  gender: { type: String, require: true }, //genero
  comments: { type: String, require: true },
  edition: { type: String, require: true },
});

const CopySchema = new mongoose.Schema({
  originalBook: { type: BookSchema, required: true },
  copies: [
    {
      _id: false,
      copyId: {
        type: mongoose.Schema.Types.ObjectId,
        default: function () {
          return new mongoose.Types.ObjectId();
        },
      },
      inShelf: { type: Boolean, default: false },
    },
  ],
});

const ShelfSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  position: { type: String, required: true },
  category: { type: String, required: true },
  copies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Copy" }],
});

const book = mongoose.model("books", BookSchema);
const shelf = mongoose.model("shelfs", ShelfSchema);
const CopyModel = mongoose.model("copies", CopySchema);
module.exports = { book, shelf, CopyModel };
