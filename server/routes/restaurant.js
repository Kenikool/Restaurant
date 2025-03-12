// routes/restaurants.js
const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");
const auth = require("../middleware/auth");

// @route   GET api/restaurants
// @desc    Get all restaurants
// @access  Public
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate("menu");
    res.json(restaurants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/restaurants
// @desc    Add a new restaurant
// @access  Private (Admin) - To be implemented later
router.post("/", async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    const restaurant = await newRestaurant.save();
    res.json(restaurant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/users/me
// @desc    Get current user
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
