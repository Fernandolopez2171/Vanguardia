const shelfModel = require("../model/bookModel");

async function shelfCreate(req, res) {
  const newShelf = new shelfModel.shelf(req.body);
  try {
    await newShelf.save();
    res.send({ message: "Shelf created successfully", status: "200" });
  } catch (err) {
    res.status(500).send({ message: "Internal server error", status: "500" });
  }
}

async function shelfGetAll(req, res) {
  try {
    const shelfs = await shelfModel.shelf.find();
    await Promise.all(
      shelfs.map(async (shelf) => {
        const books = await Promise.all(
          shelf.booksID.map(async (bookID) => {
            const book = await shelfModel.book.findOne({ id: bookID });
            return book;
          })
        );

        shelf.booksID = books;
      })
    );

    res.send({
      message: "Data obtained successfully",
      status: "200",
      data: shelfs,
    });
  } catch (err) {
    res.status(500).send({ message: "Internal server error", status: "500" });
  }
}

async function shelfGetOne(req, res) {
  try {
    const shelfID = req.params.id;
    const shelf = await shelfModel.shelf.findOne({ id: shelfID });
    if (shelf) {
      const books = await Promise.all(
        shelf.booksID.map(async (bookID) => {
          const book = await shelfModel.book.findOne({ id: bookID });
          return book;
        })
      );

      shelf.booksID = books;
    }
    res.send({
      message: "Data obtained successfully",
      status: "200",
      data: shelf,
    });
  } catch (err) {
    res.status(500).send({ message: "Internal server error", status: "500" });
  }
}

module.exports = {
  shelfCreate,
  shelfGetAll,
  shelfGetOne,
};
