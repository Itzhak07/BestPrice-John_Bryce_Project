var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  city: {
    type: String
  },
  street: {
    type: String
  },
  deliveryDate: {
    type: String,
    default: Date.now
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  creditCard: {
    type: Number
  }
});

module.exports = mongoose.model("Order", orderSchema);
