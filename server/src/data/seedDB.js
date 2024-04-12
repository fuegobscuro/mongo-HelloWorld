const ProgrammingLanguage = require('../models/ProgrammingLanguage');
const programmingLanguagesData = require('./programmingLanguages.json');

async function seedDB() {
  try {
    await ProgrammingLanguage.deleteMany({});
    await ProgrammingLanguage.insertMany(programmingLanguagesData);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Failed to seed database:', error);
  }
}

if (require.main === module) {
  // If run directly through "node seeDB.js", it will seed, then exit.
  seedDB().finally(() => process.exit());
}

module.exports = seedDB;
