const ProgrammingLanguage = require('../models/ProgrammingLanguage');

exports.getAllProgrammingLanguages = async (req, res) => {
  try {
    const languages = await ProgrammingLanguage.find({});
    res.json(languages);
  } catch (error) {
    res.status(500).send(error);
  }
};
