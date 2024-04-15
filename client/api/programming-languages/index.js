const mongoose = require('mongoose');
const ProgrammingLanguage = require('../../models/ProgrammingLanguage');

const mongoUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL
    : process.env.DATABASE_URL_DEV;

async function connectToDatabase() {
  if (mongoose.connection.readyState !== 1) {
    return mongoose.connect(mongoUrl);
  }
  return Promise.resolve();
}

async function handler(req, res) {
  try {
    await connectToDatabase();
    const includeInactive = req.query.includeInactive === 'true';
    const queryCondition = includeInactive ? {} : { isActive: true };
    const languages = await ProgrammingLanguage.find(queryCondition).sort({
      createdAt: -1,
    });
    res.status(200).json(languages);
  } catch (error) {
    console.error('Error accessing the database:', error);
    res.status(500).json({ error: 'Failed to retrieve data.' });
  }
}

module.exports = handler;
