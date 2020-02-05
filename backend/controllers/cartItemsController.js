const CartItem = require("../models/cartItems");
const ProductController = require("./productsController");

class cartItemsController {
  static getAll() {
    return new Promise((resolve, reject) => {
      CartItem.find()
        .populate("product")
        .populate("cart")
        .exec((err, data) => {
          if (err) reject(err);
          resolve(data);
        });
    });
  }

  static getThisCartItems(id) {
    return new Promise((resolve, reject) => {
      CartItem.find({ cart: `${id}` })
        .populate("product")
        .populate("cart")
        .exec((err, data) => {
          if (err) reject(err);
          resolve(data);
        });
    });
  }

  static async newCartItem(req) {
    try {
      const { id, quantity, price, cartId } = req.body;

      return new Promise((resolve, reject) => {
        let newCartItem = new CartItem({
          product: id,
          cart: cartId,
          quantity: quantity,
          totalPrice: quantity * price
        });

        newCartItem.save(function(err, data) {
          if (err) reject(err);
          resolve(cartItemsController.getThisCartItems(cartId));
        });
      });
    } catch (err) {
      return err;
    }
  }

  static deleteCartItem(id) {
    return new Promise((resolve, reject) => {
      CartItem.findOneAndRemove({ _id: id }, (err, cartItems) => {
        if (err) reject(err);

        resolve(cartItems);
      });
    });
  }
}

module.exports = cartItemsController;
