const Cart = require("../models/carts");

class cartsController {
  static getAll() {
    return new Promise((resolve, reject) => {
      Cart.find()
        .populate("user")
        .exec((err, data) => {
          if (err) reject(err);
          resolve(data);
        });
    });
  }

  static findSingleCart(req) {
    const id = req.params.id;
    return new Promise((resolve, reject) => {
      Cart.findById(id).exec((err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  static addCart(req) {
    return new Promise((resolve, reject) => {
      let userId = req.body.userId;

      let newCart = new Cart({
        user: userId
      });
      console.log(newCart);

      newCart.save(function(err, data) {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  static findOpenCarts(req) {
    const { id } = req.params;
    return new Promise((resolve, reject) => {
      Cart.find({ user: id, status: "Active" })
        .populate("user")
        .exec((err, data) => {
          if (err) reject(err);
          resolve(data);
        });
    });
  }

  static closeCart(id) {
    return new Promise((resolve, reject) => {
      Cart.findOneAndUpdate(id, { status: "Not-Active" }, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
}

module.exports = cartsController;
