const mongoose = require('mongoose');

const mongoUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL
    : process.env.DATABASE_URL_DEV;

const connectToDatabase = () => {
  if (mongoose.connection.readyState !== 1) {
    return mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return Promise.resolve();
};

module.exports = connectToDatabase;
