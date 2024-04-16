const connectToDatabase = require('../../configs/dbConnect');
const ProgrammingLanguage = require('../../models/ProgrammingLanguage');

module.exports = async (req, res) => {
  await connectToDatabase();

  const { id } = req.query;

  try {
    const deletedLanguage = await ProgrammingLanguage.findByIdAndDelete(id);
    if (!deletedLanguage) {
      return res
        .status(404)
        .json({ message: 'Programming language not found' });
    }
    res.json({ message: 'Programming language deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting programming language',
      error: error.message,
    });
  }
};
