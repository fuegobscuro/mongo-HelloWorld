const connectToDatabase = require('../../configs/dbConnect');
const ProgrammingLanguage = require('../../models/ProgrammingLanguage');
const { isAuthenticated, isAdmin } = require('../../configs/authMiddleware');

async function handler(req, res) {
  const includeInactive = req.query.includeInactive === 'true';

  if (includeInactive) {
    isAuthenticated(req, res, () => {
      isAdmin(req, res, async () => {
        try {
          await connectToDatabase();
          const languages = await ProgrammingLanguage.find({}).sort({
            createdAt: -1,
          });
          res.status(200).json(languages);
        } catch (error) {
          console.error('Error accessing the database:', error);
          res.status(500).json({ error: 'Failed to retrieve data.' });
        }
      });
    });
  } else {
    try {
      await connectToDatabase();
      const languages = await ProgrammingLanguage.find({ isActive: true }).sort(
        { createdAt: -1 }
      );
      res.status(200).json(languages);
    } catch (error) {
      console.error('Error accessing the database:', error);
      res.status(500).json({ error: 'Failed to retrieve data.' });
    }
  }
}

module.exports = handler;
