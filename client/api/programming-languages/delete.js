const connectToDatabase = require('../../configs/dbConnect');
const ProgrammingLanguage = require('../../models/ProgrammingLanguage');
const {
  isAuthenticated,
  isSuperAdmin,
} = require('../../configs/authMiddleware');

module.exports = async (req, res) => {
  isAuthenticated(req, res, () => {
    isSuperAdmin(req, res, async () => {
      await connectToDatabase();

      const { id } = req.query;

      try {
        const language = await ProgrammingLanguage.findOne({ _id: id });
        if (!language) {
          return res
            .status(404)
            .json({ message: 'Programming language not found' });
        }

        await language.deleteOne();

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
    });
  });
};
