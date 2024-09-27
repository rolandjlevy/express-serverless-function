const Slider = require('../models/Slider');

const getAllSliders = async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.json(sliders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSliders
};