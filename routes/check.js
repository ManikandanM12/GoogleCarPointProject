const express = require('express');
const Checkin = require('../models/CheckIn'); // Adjust the path as necessary

const router = express.Router();

// POST check-in
router.post("/", async (req, res) => {
  const { carNumber, customerName, serviceType, checkInDate, address } = req.body;

  // Ensure required fields are provided
  if (!carNumber || !customerName || !serviceType || !checkInDate || !address) {
    return res.status(400).json({ error: 'Car number, customer name, service type, check-in date, and address are required.' });
  }

  try {
    const newCheckin = new Checkin(req.body);
    await newCheckin.save();
    res.status(201).json(newCheckin); // Return the created check-in
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save check-in data.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const checkins = await Checkin.find(); // Fetch all check-in records
    res.status(200).json(checkins); // Send check-in data as response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
