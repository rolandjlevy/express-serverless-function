const { createServer } = require('@vercel/node');
const app = require('../app.js'); // Path to your app entry file

module.exports = createServer(app);