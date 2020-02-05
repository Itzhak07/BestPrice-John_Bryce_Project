var express = require("express");
var router = express.Router();
const cartItemsController = require("../controllers/cartItemsController");
const userAuth = require("../middleware/user-auth-mw");

/* GET all Cart Items. */
router.get("/", userAuth, async (req, res, next) => {
  try {
    const cartItems = await cartItemsController.getAll();
    console.log(cartItems);

    res.json({ page: "Get all cart Items", cartItems });
  } catch (err) {
    console.log(err);

    res.json({ error: err.errmsg });
  }
});

// POST new cartItem
router.post("/", userAuth, async (req, res, next) => {
  try {
    const cartItems = await cartItemsController.newCartItem(req);
    console.log(cartItems);

    res.json({ page: "add new Cart Item", cartItems });
  } catch (err) {
    console.log(err);

    res.json({ error: err.errmsg });
  }
});

// Get all cart Items of User's cart

router.get("/:cartId", userAuth, async (req, res, next) => {
  const id = req.params.cartId;
  try {
    const cartItems = await cartItemsController.getThisCartItems(id);
    console.log(cartItems);

    res.json({ page: "Get all Users's cart items", cartItems });
  } catch (err) {
    console.log(err);

    res.json({ error: err.errmsg });
  }
});

// Delete Cart Item

router.delete("/delete/:id", userAuth, async (req, res, next) => {
  const { id } = req.params;

  try {
    const cartItems = await cartItemsController.deleteCartItem(id);
    console.log(cartItems);

    res.json({ page: "updated cart items list", cartItems });
  } catch (err) {
    console.log(err);

    res.json({ error: err.errmsg });
  }
});

module.exports = router;
