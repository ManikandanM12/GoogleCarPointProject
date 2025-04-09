const express =require('express');
const Review =require('../models/review.js');

const router = express.Router();

// Get all reviews
router.get('/', async (req, res) => {
  const reviews = await Review.find().sort({ date: -1 });
  res.json(reviews);
});

// Post a review
router.post('/', async (req, res) => {
  const { name, rating, comment } = req.body;
  if (!name || !rating || !comment) return res.status(400).json({ msg: "All fields required" });

  const newReview = new Review({ name, rating, comment });
  await newReview.save();
  res.status(201).json(newReview);
});

module.exports = router;
