var express = require("express");
var router = express.Router();
var axios = require("axios");
const localData = require("../Utils/data.js");

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const response = await axios.get("http://localhost:3000/data");
    res.render("index", {
      title: "My Branch ",
      localData: response.data,
    });
  } catch (error) {
    console.error("Error al hacer la solicitud con Axios:", error.message);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/data", (req, res) => {
  res.json(localData);
});

module.exports = router;
