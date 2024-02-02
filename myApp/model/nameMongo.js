const mongoose = require("mongoose");

const ExampleDataSchema = new mongoose.Schema({
  name: String,
});

const ExampleData = mongoose.model(
  "ExampleData",
  ExampleDataSchema,
  "example_data"
);

module.exports = ExampleData;
