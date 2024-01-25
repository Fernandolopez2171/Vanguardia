var express = require("express");
var router = express.Router();
var axios = require("axios");

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const response = await axios.get("http://localhost:3000/my-local-data");
    res.render("index", {
      title: "My Branch ",
      localData: response.data,
    });
  } catch (error) {
    console.error("Error al hacer la solicitud con Axios:", error.message);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/my-local-data", (req, res) => {
  const localData = [
    {
      id: 1,
      name: "Khristopher Lopez",
      age: 24,
    },
  ];

  res.json(localData);
});

module.exports = router;
