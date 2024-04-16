const connectToDatabase = require('../../configs/dbConnect');
const ProgrammingLanguage = require('../../models/ProgrammingLanguage');

module.exports = async (req, res) => {
  await connectToDatabase();

  const { id } = req.query;

  try {
    const updatedLanguage = await ProgrammingLanguage.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedLanguage) {
      return res
        .status(404)
        .json({ message: 'Programming language not found' });
    }
    res.json(updatedLanguage);
  } catch (error) {
    res.status(500).json({
      message: 'Error updating programming language',
      error: error.message,
    });
  }
};
