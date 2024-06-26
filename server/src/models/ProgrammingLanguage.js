const mongoose = require('mongoose');

const programmingLanguageSchema = new mongoose.Schema(
  {
    name: String,
    year: Number,
    creator: String,
    description: String,
    helloWorldCode: String,
    tiobeRank: Number,
    codeLang: String, // Code for syntax highlighting of the programming language
    codeDevicon: String, // Code name used for Devicon's icon
    codeSimpleIcons: String, // URL for Simple Icon's icon if there's no codeDevicon
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true, // `createdAt` and `updatedAt` fields
  }
);

const ProgrammingLanguage = mongoose.model(
  'ProgrammingLanguage',
  programmingLanguageSchema
);

module.exports = ProgrammingLanguage;
