var express = require("express");
var router = express.Router();
const categoriesController = require("../controllers/categoriesController");

/* GET All Categories. */
router.get("/", async (req, res, next) => {
  try {
    const categories = await categoriesController.getAll();

    res.json({ page: "Get all Categories Page", categories });
  } catch (err) {
    console.log(err);

    res.json({ error: err.errmsg });
  }
});

module.exports = router;
