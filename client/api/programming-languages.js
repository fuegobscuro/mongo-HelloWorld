const mongoose = require('mongoose');
const ProgrammingLanguage = require('./models/ProgrammingLanguage');

// MongoDB connection string from environment variables
const mongoUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL
    : process.env.DATABASE_URL_DEV;

// Function to handle connection to MongoDB
const connectToDatabase = async () => {
  if (mongoose.connection.readyState !== 1) {
    return mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return Promise.resolve();
};

// Serverless function exported as default
module.exports = async (req, res) => {
  try {
    // Ensure database connection is established
    await connectToDatabase();

    // Handle query parameter for including inactive languages
    const includeInactive = req.query.includeInactive === 'true';
    const queryCondition = includeInactive ? {} : { isActive: true };

    // Fetch programming languages based on query condition
    const languages = await ProgrammingLanguage.find(queryCondition).sort({
      createdAt: -1,
    });

    // Return the list of programming languages
    res.status(200).json(languages);
  } catch (error) {
    // Handle errors
    console.error('Error accessing the database:', error);
    res.status(500).json({ error: 'Failed to retrieve data.' });
  }
};
