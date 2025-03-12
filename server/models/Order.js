const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
      quantity: Number,
    },
  ],
  total: { type: Number },
  status: { type: String, default: "Pending" },
  deliveryAddress: { type: String },
  orderType: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
