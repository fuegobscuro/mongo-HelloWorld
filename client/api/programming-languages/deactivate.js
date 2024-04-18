const connectToDatabase = require('../../configs/dbConnect');
const ProgrammingLanguage = require('../../models/ProgrammingLanguage');

module.exports = async (req, res) => {
  await connectToDatabase();

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'No ID provided' });
  }

  try {
    const language = await ProgrammingLanguage.findById(id);
    if (!language) {
      return res
        .status(404)
        .json({ message: 'Programming language not found' });
    }
    if (!language.isActive) {
      return res
        .status(400)
        .json({ message: 'Programming language already deactivated' });
    }

    language.isActive = false;
    await language.save();

    res.json({ message: 'Programming language deactivated successfully' });
  } catch (error) {
    console.error('Error in operation', error);
    res
      .status(500)
      .json({ message: 'Error processing request', error: error.message });
  }
};
