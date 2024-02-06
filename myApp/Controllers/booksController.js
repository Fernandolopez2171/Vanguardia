const booksModel = require("../model/bookModel");

async function booksCreate(req, res) {
  const newBook = new booksModel.book(req.body);
  try {
    await newBook.save();
    res.send({ message: "Book created successfully", status: "200" });
  } catch (err) {
    res.status(500).send({ message: "Internal server error", status: "500" });
  }
}

async function booksGetAll(req, res) {
  try {
    const books = await booksModel.book.find();
    res.send({
      message: "Data obtained successfully",
      status: "200",
      data: books,
    });
  } catch (err) {
    res.status(500).send({ message: "Internal server error", status: "500" });
  }
}

async function booksGetOne(req, res) {
  try {
    const bookID = req.params.id;
    const book = await booksModel.book.findOne({ id: bookID });
    res.send({
      message: "Data obtained successfully",
      status: "200",
      data: book,
    });
  } catch (err) {
    res.status(500).send({ message: "Internal server error", status: "500" });
  }
}

async function deleteBook(req, res) {
  try {
    const bookID = req.params.id;
    console.log(bookID);
    await booksModel.book.deleteOne({ id: bookID });
    res.send({ message: "Book deleted successfully", status: "200" });
  } catch (err) {
    res.status(500).send({ message: "Internal server error", status: "500" });
  }
}

async function updateBook(req, res) {
  try {
    const bookID = req.params.id;
    await booksModel.book.updateOne({ id: bookID }, req.body);
    res.send({ message: "Book updated successfully", status: "200" });
  } catch (err) {
    res.status(500).send({ message: "Internal server error", status: "500" });
  }
}

module.exports = {
  booksCreate,
  booksGetAll,
  deleteBook,
  updateBook,
  booksGetOne,
};
