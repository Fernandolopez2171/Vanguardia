var express = require("express");
var router = express.Router();
const booksController = require("../Controllers/booksController");


//POST
router.post("/create", booksController.booksCreate);
//GET
router.get("/getAll", booksController.booksGetAll);
router.get("/getOne/:id", booksController.booksGetOne);
//DELETE
router.delete("/delete/:id", booksController.deleteBook);
//PUT
router.put("/update/:id", booksController.updateBook);
module.exports = router;
