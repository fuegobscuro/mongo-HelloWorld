const mongoose = require('mongoose');
const ProgrammingLanguage = require('../../models/ProgrammingLanguage');

const mongoUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL
    : process.env.DATABASE_URL_DEV;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = async (req, res) => {
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
    res
      .status(500)
      .json({ error: 'Failed to create language', details: error.message });
  }
};
