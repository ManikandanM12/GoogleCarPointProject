const mongoose = require("mongoose");

const userActivitySchema = new mongoose.Schema({
  page: { type: String, unique: true }, // 👈 Unique page route
  totalDuration: { type: Number, default: 0 },
  totalClicks: { type: Number, default: 0 },
  maxScroll: { type: Number, default: 0 },
  visits: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("UserActivity", userActivitySchema);