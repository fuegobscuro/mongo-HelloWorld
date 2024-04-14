// // server/index.js
const express = require('express');
const app = express();

app.get('/api/test', (req, res) => {
  res.send('Server is running!');
});

module.exports = app;
