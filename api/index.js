// const mongoose = require('mongoose');
// require('dotenv').config();

// const { PORT = 3000, MONGODB_URI } = process.env;
// const app = require('../app.js');

// mongoose.connect(MONGODB_URI)
// .then(client => {
//   console.log("Database Connected Successfully");
//   app.listen(PORT, () => {
//     console.log(`Server started at port ${PORT}`);
//   });
// })
// .catch(err => {
//   console.error(err.stack);
//   process.exit(1);
// });




const { createServer } = require('@vercel/node');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(express.json());

const Slider = require('../models/Slider');
const { PORT = 3000, MONGODB_URI } = process.env;

app.get('/sliders', async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.json(sliders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/', (req, res) => {
  res.send(
    `<h3>Home<h3>
    <a href="/sliders">sliders</a>`
  );
});

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("Database Connected Successfully");
    module.exports = createServer(app);
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });