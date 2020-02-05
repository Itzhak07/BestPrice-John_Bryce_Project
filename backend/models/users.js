var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  identification: { type: String, required: true, unique: true },
  city: { type: String },
  street: { type: String },
  role: { type: Number }
});

module.exports = mongoose.model("User", userSchema);
