const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  hours: { type: Object },
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" }],
  images: [String],
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
