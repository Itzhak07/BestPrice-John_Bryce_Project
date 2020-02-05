var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var cartItemSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    required: true
  }
});

module.exports = mongoose.model("CartItem", cartItemSchema);
