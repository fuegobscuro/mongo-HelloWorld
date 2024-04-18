const connectToDatabase = require('../../configs/dbConnect');
const ProgrammingLanguage = require('../../models/ProgrammingLanguage');

module.exports = async (req, res) => {
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
