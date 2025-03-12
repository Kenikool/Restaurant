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
router.post(
  "/",
  auth,
  [
    body("name", "Name is required").not().isEmpty(),
    body("price", "Price is required and must be a number").isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!req.user.isAdmin) {
      return res.status(403).json({ msg: "Forbidden: Admin access required" });
    }
    try {
      const newItem = new MenuItem(req.body);
      const menuItem = await newItem.save();
      res.json(menuItem);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   PUT api/menu/:id
// @desc    Update a menu item
// @access  Private (Admin)
router.put("/:id", auth, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ msg: "Forbidden: Admin access required" });
  }
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
  if (!req.user.isAdmin) {
    return res.status(403).json({ msg: "Forbidden: Admin access required" });
  }
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ msg: "Menu item deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
