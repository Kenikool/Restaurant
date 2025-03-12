const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  address: { type: String },
  phone: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
