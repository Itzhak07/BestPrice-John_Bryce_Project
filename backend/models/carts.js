var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var cartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: "Active"
  }
});

module.exports = mongoose.model("Cart", cartSchema);
