const express = require("express");
const router = express.Router();
const UserActivity = require("../models/activity");

router.post("/", async (req, res) => {
  const { page, duration, clicks, maxScroll } = req.body;

  try {
    const updatedActivity = await UserActivity.findOneAndUpdate(
      { page },
      {
        $inc: {
          totalDuration: duration,
          totalClicks: clicks,
          visits: 1
        },
        $max: { maxScroll },
        $set: { updatedAt: new Date() }
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Activity updated", data: updatedActivity });
  } catch (error) {
    console.error("Error updating activity:", error);
    res.status(500).json({ error: "Failed to update activity" });
  }
});

router.get("/", async (req, res) => {
  try {
    const activities = await UserActivity.find().sort({ updatedAt: -1 });
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch activity data" });
  }
});

module.exports = router;
