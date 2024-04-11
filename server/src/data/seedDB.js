const ProgrammingLanguage = require('../models/ProgrammingLanguage');
const programmingLanguagesData = require('./programmingLanguages.json');
const Contact = require('../models/Contact');

async function seedDB() {
  try {
    // Delete all entries for "Contact" and "ProgrammingLanguage" on seeding.
    await Contact.deleteMany({});
    await ProgrammingLanguage.deleteMany({});
    await ProgrammingLanguage.insertMany(programmingLanguagesData);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Failed to seed database:', error);
  }
}

if (require.main === module) {
  // If run directly using "node seeDB.js", seed the DB then exit.
  seedDB().finally(() => process.exit());
}

module.exports = seedDB;
