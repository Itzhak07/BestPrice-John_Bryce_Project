const Order = require("../models/orders");
const moment = require("moment");

class ordersController {
  static getAll() {
    return new Promise((resolve, reject) => {
      Order.find()
        .populate("user")
        .populate("cart")
        .exec((err, data) => {
          if (err) reject(err);
          resolve(data);
        });
    });
  }

  static newOrder(req) {
    let {
      user,
      cart,
      totalPrice,
      city,
      street,
      deliveryDate,
      creditCard
    } = req.body;
    return new Promise((resolve, reject) => {
      let newOrder = new Order({
        user: user,
        cart: cart,
        totalPrice: totalPrice,
        city: city,
        street: street,
        deliveryDate: moment(deliveryDate).format("DD-MM-YYYY"),
        creditCard: creditCard
      });

      newOrder.save(function(err, data) {
        if (err) {
          reject({
            msg: "Error in submiting order"
          });
          console.log(err);
        }

        resolve(data);
      });
    });
  }

  static checkOrderDelivery(req) {
    let { deliveryDate } = req.body;

    return new Promise((resolve, reject) => {
      Order.find({ deliveryDate: deliveryDate }, function(err, data) {
        if (err)
          reject({
            msg: "Error Accured"
          });

        if (data.length >= 3) {
          reject({
            msg:
              "Deliverys are full for this day, please choose a different day"
          });
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = ordersController;
