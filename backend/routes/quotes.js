const express = require("express");
const Quote = require("../models/Quote"); // Assuming you have a Quote model
const router = express.Router();

// Endpoint to get a random quote
router.get("/random", async (req, res) => {
  try {
    const quote = await Quote.aggregate([{ $sample: { size: 1 } }]);
    res.json(quote[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching random quote", error });
  }
});

// Endpoint to search for quotes by author
router.get("/search", async (req, res) => {
  const { author } = req.query;
  try {
    const quotes = await Quote.find({ author: new RegExp(author, "i") });
    if (quotes.length === 0) {
      return res.status(404).json({ message: "No quotes found" });
    }
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: "Error searching quotes", error });
  }
});

module.exports = router;
