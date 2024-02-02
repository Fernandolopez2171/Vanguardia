const mongoose = require("mongoose");

const ExampleDataSchema = new mongoose.Schema({
  name: String,
});

const ExampleData = mongoose.model("example_datas", ExampleDataSchema);
/*const ExampleData = mongoose.model(
  "example_data",
  ExampleDataSchema,
  "example_data"
);*/
module.exports = ExampleData;
