require('dotenv').config();
const express = require('express');

// Middleware imports:
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// Routes index import:
const routes = require('../src/routes/index.js');
// Passport & session imports:
const passport = require('passport');
require('../src/configs/passportConfig')(passport);
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Server initialization:
const app = express();
app.use(express.json());

// CORS configuration:
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://helloworldcompendium.vercel.app'
        : 'http://localhost:3000',
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

// Middlewares:
app.use(bodyParser.json());
app.use(morgan('dev'));

// Passport session initialization:
// Correctly log the URL outside of the MongoStore.create() call
console.log('MongoDB URL:', process.env.DATABASE_URL_DEV);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:
        process.env.NODE_ENV === 'production'
          ? process.env.DATABASE_URL
          : process.env.DATABASE_URL_DEV,
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
  }

  res.status(status).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack }),
  });
});

module.exports = app;
