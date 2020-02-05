var express = require("express");
var router = express.Router();
var upload = require("../services/multer");
const productsController = require("../controllers/productsController");

const adminAuth = require("../middleware/admin-auth-mw");
const userAuth = require("../middleware/user-auth-mw");

/* GET All Products. */
router.get("/", async (req, res, next) => {
  try {
    const products = await productsController.getAll();

    res.json({ page: "Get all products Page", products });
  } catch (err) {
    console.log(err);

    res.json({ error: err.errmsg });
  }
});

// Post new product
router.post("/", [adminAuth, upload.single("file")], async (req, res, next) => {
  try {
    const { body, file } = req;

    const products = await productsController.addProduct(body, file);
    res.json({ page: "add new Product", products });
  } catch (err) {
    console.log(err);

  }
});

//PUT update product
router.put(
  "/update/",
  [adminAuth, upload.single("file")],
  async (req, res, next) => {
    try {
      const { body, file } = req;
      console.log(body);
      console.log(file);

      const products = await productsController.updateProduct(body, file);

      res.json({ page: "update product", products });
    } catch (err) {
      console.log(err);

      res.json({ error: err.errmsg });
    }
  }
);

//Get products by cateogry
router.get("/category/:id", async (req, res, next) => {
  try {
    const products = await productsController.getProductsByCategory(req);
    console.log(products);

    res.json({ page: "Get Products By Category", products });
  } catch (err) {
    console.log(err);

    res.json({ error: err.errmsg });
  }
});

// Search Product
router.get("/search/:name", userAuth, async (req, res, next) => {
  try {
    const products = await productsController.searchProduct(req);
    console.log(products);

    res.json({ page: "Products Search", products });
  } catch (err) {
    console.log(err);

    res.json({ error: err.errmsg });
  }
});

// Delete Product
router.delete("/delete/:id", userAuth, async (req, res, next) => {
  try {
    const products = await productsController.deleteProduct(req);
    console.log(products);

    res.json({ page: "Updated Products after delete", products });
  } catch (err) {
    console.log(err);

    res.json({ error: err.errmsg });
  }
});

module.exports = router;
