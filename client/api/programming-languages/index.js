const connectToDatabase = require('../../configs/dbConnect');
const ProgrammingLanguage = require('../../models/ProgrammingLanguage');

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
