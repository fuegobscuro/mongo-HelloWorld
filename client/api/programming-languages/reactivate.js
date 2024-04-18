const connectToDatabase = require('../../configs/dbConnect');
const ProgrammingLanguage = require('../../models/ProgrammingLanguage');

module.exports = async (req, res) => {
  await connectToDatabase();

  const { id } = req.query;

  try {
    const language = await ProgrammingLanguage.findById(id);
    if (!language) {
      return res
        .status(404)
        .json({ message: 'Programming language not found' });
    }
    if (language.isActive) {
      return res
        .status(400)
        .json({ message: 'Programming language is already active.' });
    }
    language.isActive = true;
    await language.save();
    res.json({ message: 'Programming language reactivated successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error reactivating programming language',
      error: error.message,
    });
  }
};
