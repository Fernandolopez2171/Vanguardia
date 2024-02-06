var express = require("express");
var router = express.Router();

const booksController = require("../Controllers/booksController");
const { book } = require("../model/bookModel");

//create a book
router.post("/create", booksController.booksCreate);
//GET
router.get("/getAll", booksController.booksGetAll);
//delete
router.delete("/delete/:id", booksController.deleteBook);
module.exports = router;
