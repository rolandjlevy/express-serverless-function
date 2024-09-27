// routes/items.js

const express = require('express');
const router = express.Router();
const Slider = require('../models/Slider');

// Get all items
router.get('/sliders', async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.json(sliders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// // Add a new item
// router.post('/items', async (req, res) => {
//   const item = new Item({
//     name: req.body.name,
//     description: req.body.description,
//     price: req.body.price
//   });

//   try {
//     const newItem = await item.save();
//     res.status(201).json(newItem);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

module.exports = router;