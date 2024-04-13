const express = require('express');
require('dotenv').config();
const MongoStore = require('connect-mongo');

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
      // sameSite: 'None',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      // Set domain if frontend and backend are served from different domains
      // domain: 'example.com',
      maxAge: 2 * 60 * 60 * 1000, // 2 hours cookie expiration
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
