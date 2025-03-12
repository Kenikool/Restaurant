// routes/menu.js
const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");
const auth = require("../middleware/auth");

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

// @route   PUT api/menu/:id
// @desc    Update a menu item
// @access  Private (Admin)
router.put("/:id", auth, async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/menu/:id
// @desc    Delete a menu item
// @access  Private (Admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ msg: "Menu item deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
