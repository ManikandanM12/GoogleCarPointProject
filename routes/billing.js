const express = require("express");
const router = express.Router();
const Billing = require("../models/Billing");

router.post("/", async (req, res) => {
  try {
    const billing = new Billing(req.body);
    await billing.save();
    res
      .status(200)
      .json({ success: true, message: "Billing data saved to MongoDB!" });
  } catch (err) {
    console.error("Error saving to DB:", err);
    res.status(500).json({ message: "Failed to save billing" });
  }
});
router.get("/api/billing", async (req, res) => {
  try {
    const bills = await Billing.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(bills);
  } catch (err) {
    console.error("Error fetching bills:", err);
    res.status(500).json({ message: "Failed to fetch billing records" });
  }
});
router.get("/api/billing/search/:carNumber", async (req, res) => {
  try {
    const bills = await Billing.find({ carNumber: req.params.carNumber });
    res.status(200).json(bills);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
});

router.get("api/billing/dashboard", async (req, res) => {
  try {
    const bills = await Billing.find();

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    const dailyTotal = bills
      .filter((bill) => new Date(bill.createdAt) >= startOfDay)
      .reduce((acc, curr) => acc + curr.totalAmount, 0);

    const monthlyTotal = bills
      .filter((bill) => new Date(bill.createdAt) >= startOfMonth)
      .reduce((acc, curr) => acc + curr.totalAmount, 0);

    const yearlyTotal = bills
      .filter((bill) => new Date(bill.createdAt) >= startOfYear)
      .reduce((acc, curr) => acc + curr.totalAmount, 0);

    const carFrequency = {};
    bills.forEach((bill) => {
      const car = bill.carNumber.toUpperCase();
      carFrequency[car] = (carFrequency[car] || 0) + 1;
    });

    res.json({
      dailyTotal,
      monthlyTotal,
      yearlyTotal,
      carFrequency,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const totalBills = await Billing.countDocuments();
    const totalAmount = await Billing.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    res.status(200).json({
      totalBills,
      totalAmount: totalAmount[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error });
  }
});

module.exports = router;
