// routes/orders.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const auth = require("../middleware/auth");

// @route   POST api/orders
// @desc    Create a new order
// @access  Private (User) - To be implemented later
router.post("/", auth, async (req, res) => {
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
router.get("/", auth, async (req, res) => {
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

// @route GET api/orders/:id
// @desc Get order by Id
// @access private (user)
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId")
      .populate("items.itemId");
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }
    if (order.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
