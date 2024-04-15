const mongoose = require('mongoose');
const Contact = require('../../models/Contact');

const mongoUrl = process.env.DATABASE_URL || process.env.DATABASE_URL_DEV;

const connectToDatabase = async () => {
  if (mongoose.connection.readyState !== 1) {
    return mongoose.connect(mongoUrl);
  }
  return Promise.resolve();
};

module.exports = async (req, res) => {
  try {
    await connectToDatabase();

    const messages = await Contact.find({});

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ error: 'Failed to fetch contact messages.' });
  }
};
