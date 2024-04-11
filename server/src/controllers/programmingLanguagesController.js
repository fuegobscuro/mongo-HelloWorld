const ProgrammingLanguage = require('../models/ProgrammingLanguage');

// Get all programming languages, conditional for Home and Admin dashboard
exports.getAllProgrammingLanguages = async (req, res) => {
  try {
    const includeInactive = req.query.includeInactive === 'true';
    const queryCondition = includeInactive ? {} : { isActive: true };

    const languages = await ProgrammingLanguage.find(queryCondition).sort({
      createdAt: -1,
    });
    res.json(languages);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create new programming language
exports.createProgrammingLanguage = async (req, res) => {
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
    res.status(500).json({
      message: 'Error creating programming language',
      error: error.message,
    });
  }
};

// Update programming language entry
exports.updateProgrammingLanguage = async (req, res) => {
  const { id } = req.params;

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

// Deactivate programming language entry
exports.deactivateProgrammingLanguage = async (req, res) => {
  const { id } = req.params;

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
        .json({ message: 'Programming language is already deactivated.' });
    }
    language.isActive = false;
    await language.save();
    res.json({ message: 'Programming language deactivated successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error deactivating programming language',
      error: error.message,
    });
  }
};

// Reactivate programming language entry
exports.reactivateProgrammingLanguage = async (req, res) => {
  const { id } = req.params;

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

// Delete programming language entry (super admin only)
exports.deleteProgrammingLanguage = async (req, res) => {
  const { id } = req.params;

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
