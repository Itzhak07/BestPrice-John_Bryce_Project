var express = require("express");
var router = express.Router();
const ordersController = require("../controllers/ordersController");
const cartsController = require("../controllers/cartsController");

/* GET all orders. */
router.get("/", async (req, res, next) => {
  try {
    const orders = await ordersController.getAll();

    res.json({ page: "Get all orders Page", orders });
  } catch (err) {
    console.log(err);

    res.json({ error: err.errmsg });
  }
});

// POST order

router.post("/", async (req, res, next) => {
  let { cart } = req.body;
  try {
    const checkDate = await ordersController.checkOrderDelivery(req);
    const newOrder = await ordersController.newOrder(req);
    await cartsController.closeCart(cart);
    res.json({ page: "Order Completed", newOrder });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

module.exports = router;
