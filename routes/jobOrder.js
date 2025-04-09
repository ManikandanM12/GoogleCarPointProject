const express = require("express");
const JobOrder =require("../models/JobOrder");
const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const newJob = new JobOrder(req.body);
    await newJob.save();
    res.status(201).json({ message: "Job Order created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete("/:id", async (req, res) => {
    try {
      await JobOrder.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Job order deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

router.get("/", async (req, res) => {
    try {
      const orders = await JobOrder.find().sort({ createdAt: -1 });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = router;
