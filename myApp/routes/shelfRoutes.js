var express = require("express");
var router = express.Router();
const shelfController = require("../Controllers/shelfController");

//POST
router.post("/create", shelfController.shelfCreate);

//GET
router.get("/getAll", shelfController.shelfGetAll);
router.get("/getOne/:id", shelfController.shelfGetOne);

module.exports = router;