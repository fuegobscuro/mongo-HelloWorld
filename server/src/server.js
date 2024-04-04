const express = require('express');
const PORT = process.env.PORT || 3001;

// Model imports:
const ProgrammingLanguage = require('../src/models/ProgrammingLanguage');
// Middlewares import:
const cors = require('cors');
// Routes index import:
const routes = require('../src/routes/index.js');

// Server initialization:
const app = express();
app.use(express.json());

// CORS configuration:
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
  })
);

// Routes index:
app.use('/', routes);

// Error handling:
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || 'Something went wrong on the server.';
  const stack = process.env.NODE_ENV === 'development' ? err.stack : undefined;
  // Only send stack trace in development mode

  console.error(`Error: ${message}`);
  if (process.env.NODE_ENV === 'development') {
    console.error(stack);
    // Log stack trace in development mode for easier debugging
  }

  // Send error response
  res.status(status).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack }),
    // Include stack trace in response only in development mode
  });
});

module.exports = app;
