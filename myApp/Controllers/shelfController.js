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
        const books = await shelfModel.book.find({
          id: { $in: shelf.booksID },
        });
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
      const books = await shelfModel.book.find({
        id: { $in: shelf.booksID },
      });
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

async function shelfUpdate(req, res) {
  const shelfID = req.params.id;
  const shelf = await shelfModel.shelf.findOne({ id: shelfID });
  if (shelf) {
    try {
      await shelfModel.shelf.updateOne({ id: shelfID }, req.body);
      res.send({ message: "Shelf updated successfully", status: "200" });
    } catch (err) {
      res.status(500).send({ message: "Internal server error", status: "500" });
    }
  } else {
    res.status(404).send({ message: "Shelf not found", status: "404" });
  }
}

async function shelfDelete(req, res) {
  const shelfID = req.params.id;
  const shelf = await shelfModel.shelf.findOne({
    id: shelfID,
  });
  if (shelf) {
    try {
      await shelfModel.shelf.deleteOne({ id: shelfID });
      res.send({ message: "Shelf deleted successfully", status: "200" });
    } catch (err) {
      res.status(500).send({ message: "Internal server error", status: "500" });
    }
  } else {
    res.status(404).send({ message: "Shelf not found", status: "404" });
  }
}

module.exports = {
  shelfCreate,
  shelfGetAll,
  shelfGetOne,
  shelfUpdate,
  shelfDelete,
};
