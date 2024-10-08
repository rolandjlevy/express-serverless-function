const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Slider = require('./models/Slider');

// const slidersHandler = require('./api/sliders');
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

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
      <a href="/sliders">sliders</a>
    `);
});

/*////////////////*/
/* Error handling */
/*////////////////*/

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// wildcard route throws 302 error (temporary redirect)
app.get('*', (req, res, next) => {
  const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);
  error.statusCode = 302;
  next(error);
});

// middleware for handing errors
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'unknown';
  if (err.statusCode === 302) {
    return res.status(302).redirect('/not-found');
  }
  return res.status(status).json({ error:err.toString() })
});

// page not found (404)
app.get('/not-found', (req, res) => {
  const { originalUrl } = req;
  res.status(404).json({ message:'pages/not-found', originalUrl });
});

module.exports = app;