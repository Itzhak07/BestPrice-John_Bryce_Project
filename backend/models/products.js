var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
  name: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  price: { type: Number, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model("Product", productSchema);
