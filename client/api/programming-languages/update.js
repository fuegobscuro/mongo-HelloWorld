const connectToDatabase = require('../../configs/dbConnect');
const ProgrammingLanguage = require('../../models/ProgrammingLanguage');
const {
  validateProgrammingLanguageForm,
} = require('../../validations/programmingLanguageValidations');
const { isAuthenticated, isAdmin } = require('../../configs/authMiddleware');

module.exports = async (req, res) => {
  isAuthenticated(req, res, () => {
    isAdmin(req, res, async () => {
      await connectToDatabase();

      const { id } = req.query;
      const updateData = req.body;

      const errors = validateProgrammingLanguageForm(updateData);
      if (Object.keys(errors).length > 0) {
        return res
          .status(400)
          .json({ error: 'Validation failed', details: errors });
      }

      try {
        const updatedLanguage = await ProgrammingLanguage.findByIdAndUpdate(
          id,
          updateData,
          {
            new: true,
          }
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
    });
  });
};
