const mongoose = require('mongoose');
require('dotenv').config();

const { PORT = 3000, MONGODB_URI } = process.env;
const app = require('../app.js');

mongoose.connect(MONGODB_URI)
.then(client => {
  console.log("Database Connected Successfully");
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
})
.catch(err => {
  console.error(err.stack);
  process.exit(1);
});