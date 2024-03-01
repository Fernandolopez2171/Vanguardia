const Model = require("../model/bookModel");
const mongoose = require("mongoose");

async function copyCreate(req, res) {
  const { bookId, numCopies } = req.body;

  try {
    const book = await Model.book.findOne({ id: bookId });
    if (!book) {
      return res.status(404).send({ message: "Book not found", status: "404" });
    }
    let copy = await Model.CopyModel.findOne({ "originalBook.id": bookId });
    if (!copy) {
      copy = new Model.CopyModel({ originalBook: book });
    }
    for (let i = 0; i < numCopies; i++) {
      copy.copies.push({ inShelf: false });
    }
    await copy.save();

    res.send({ message: "Copy created successfully", status: "200" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error", status: "500" });
  }
}

async function copyGet(req, res) {
  try {
    const originalBookId = req.params.id;
    let data;

    if (originalBookId) {
      // Get one copy
      const copy = await Model.CopyModel.findOne({
        originalBook: originalBookId,
      }).populate("originalBook");
      if (!copy) {
        return res
          .status(404)
          .send({ message: "Copy not found", status: "404" });
      }
      data = copy;
    } else {
      // Get all copies
      data = await Model.CopyModel.find().populate("originalBook");
    }

    res.send({
      message: "Data obtained successfully",
      status: "200",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error", status: "500" });
  }
}

async function deleteCopy(req, res) {
  try {
    const originalBookId = req.params.id;
    const copy = await Model.CopyModel.findOneAndDelete({
      originalBook: originalBookId,
    });
    if (!copy) {
      return res.status(404).send({ message: "Copy not found", status: "404" });
    }
    res.send({ message: "Copy deleted successfully", status: "200" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error", status: "500" });
  }
}

async function updateCopy(req, res) {
  try {
    const originalBookId = req.params.id;
    const copiesToUpdate = req.body;
    let updatedCopy = await Model.CopyModel.findOne({
      originalBook: originalBookId,
    });

    if (!updatedCopy) {
      return res.status(404).send({ message: "Copy not found", status: "404" });
    }

    for (let copyToUpdate of copiesToUpdate) {
      for (let copy of updatedCopy.copies) {
        if (copy.copyId.toString() === copyToUpdate.copyId) {
          copy.inShelf = copyToUpdate.inShelf;
        }
      }
    }

    updatedCopy = await updatedCopy.save();

    res.send({ message: "Copy updated successfully", status: "200" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error", status: "500" });
  }
}
module.exports = { deleteCopy, updateCopy, copyGet, copyCreate };
