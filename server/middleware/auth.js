// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import User model

module.exports = async function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.status(401).json({ msg: "Token is not valid" });
    }
    req.user = decoded.user;
    req.user.isAdmin = user.isAdmin;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
