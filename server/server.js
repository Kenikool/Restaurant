const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Routes (We'll add these later)
// app.use('/api/users', require('./routes/users'));
// app.use('/api/menu', require('./routes/menu'));
// app.use('/api/orders', require('./routes/orders'));
// app.use('/api/restaurants', require('./routes/restaurants'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
