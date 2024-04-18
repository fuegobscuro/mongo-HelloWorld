const connectToDatabase = require('../../configs/dbConnect');
const ProgrammingLanguage = require('../../models/ProgrammingLanguage');

console.log('Delete function started 1');

module.exports = async (req, res) => {
  console.log('Delete function started 2');
  console.log('Received headers:', req.headers);
  console.log('Received body:', req.body);

  await connectToDatabase();

  const { id } = req.query;
  console.log('Processing DELETE for ID:', id);

  try {
    const language = await ProgrammingLanguage.findOne({ _id: id });
    if (!language) {
      console.log('No language found with ID:', id);
      return res
        .status(404)
        .json({ message: 'Programming language not found' });
    }
    console.log('Found language:', language);

    await language.deleteOne();
    console.log('Deleted language:', language);
    res.json({
      message: 'Programming language deleted successfully',
      language: language,
    });
  } catch (error) {
    console.error('Error in delete operation:', error);
    res.status(500).json({
      message: 'Error deleting programming language',
      error: error.message,
    });
  }
};
