// routes/menu.js
const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// @route   GET api/menu
// @desc    Get all menu items
// @access  Public
router.get("/", async (req, res) => {
  try {
    const menu = await MenuItem.find();
    res.json(menu);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/menu
// @desc    Add a new menu item
// @access  Private (Admin) - To be implemented later
router.post("/", async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    const menuItem = await newItem.save();
    res.json(menuItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
