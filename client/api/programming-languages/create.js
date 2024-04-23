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

      const {
        name,
        year,
        creator,
        description,
        helloWorldCode,
        tiobeRank,
        codeLang,
        codeDevicon,
        codeSimpleIcons,
        isActive,
      } = req.body;

      const errors = validateProgrammingLanguageForm({
        name,
        year,
        creator,
        description,
        helloWorldCode,
        tiobeRank,
      });
      if (Object.keys(errors).length > 0) {
        return res
          .status(400)
          .json({ error: 'Validation failed', details: errors });
      }

      try {
        const newLanguage = new ProgrammingLanguage({
          name,
          year,
          creator,
          description,
          helloWorldCode,
          tiobeRank,
          codeLang,
          codeDevicon,
          codeSimpleIcons,
          isActive,
        });
        await newLanguage.save();
        res.status(201).json(newLanguage);
      } catch (error) {
        res
          .status(500)
          .json({ error: 'Failed to create language', details: error.message });
      }
    });
  });
};
