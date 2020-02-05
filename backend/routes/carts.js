var express = require("express");
var router = express.Router();
const cartsController = require("../controllers/cartsController");
const userAuth = require("../middleware/user-auth-mw");

/* GET all Carts. */
router.get("/", userAuth, async (req, res, next) => {
  try {
    const carts = await cartsController.getAll();
    console.log(carts);

    res.json({ page: "Get all carts Page", carts });
  } catch (err) {
    console.log(err);

    res.json({ error: err.errmsg });
  }
});

// Open New Cart
router.post("/", userAuth, async (req, res, next) => {
  try {
    const cart = await cartsController.addCart(req);
    console.log(cart);

    res.json({ page: "POST new Cart Page", cart });
  } catch (err) {
    console.log(err);

    res.json({ error: err.errmsg });
  }
});

// get open carts
router.get("/:id", userAuth, async (req, res, next) => {
  try {
    const openCart = await cartsController.findOpenCarts(req);
    console.log(openCart);

    res.json({ page: "Get open Cart Page", openCart });
  } catch (err) {
    console.log(err);

    res.json({ error: err.errmsg });
  }
});

module.exports = router;
