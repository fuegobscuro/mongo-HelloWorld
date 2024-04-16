const connectToDatabase = require('../../configs/dbConnect');
const ProgrammingLanguage = require('../../models/ProgrammingLanguage');

module.exports = async (req, res) => {
  console.log('Deactivate function triggered');
  console.log('Received query parameters:', req.query);
  try {
    await connectToDatabase();
    console.log('Database connected');

    const { id } = req.query;
    if (!id) {
      console.log('No ID provided', req.query);
      return res.status(400).json({ message: 'No ID provided' });
    }

    const language = await ProgrammingLanguage.findById(id);
    if (!language) {
      console.log('Language not found', id);
      return res
        .status(404)
        .json({ message: 'Programming language not found' });
    }
    if (!language.isActive) {
      console.log('Language already deactivated', language);
      return res
        .status(400)
        .json({ message: 'Programming language is already deactivated.' });
    }

    language.isActive = false;
    await language.save();
    console.log('Language deactivated', language);
    res.json({ message: 'Programming language deactivated successfully' });
  } catch (error) {
    console.error('Error in operation', error);
    res.status(500).json({
      message: 'Error processing request',
      error: error.message,
    });
  }
};
