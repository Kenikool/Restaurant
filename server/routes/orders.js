// routes/orders.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// @route   POST api/orders
// @desc    Create a new order
// @access  Private (User) - To be implemented later
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const order = await newOrder.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/orders
// @desc    Get all orders
// @access  Private (Admin) - To be implemented later
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId")
      .populate("items.itemId");
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
