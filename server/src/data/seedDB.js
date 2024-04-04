// const connectDB = require('../database');
const ProgrammingLanguage = require('../models/ProgrammingLanguage');
const programmingLanguagesData = require('./programmingLanguages.json');

async function seedDB() {
  //   await connectDB(); // Ensure database connection
  try {
    await ProgrammingLanguage.deleteMany({});
    await ProgrammingLanguage.insertMany(programmingLanguagesData);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Failed to seed database:', error);
  }
}

if (require.main === module) {
  // If run directly, seed the DB then exit.
  seedDB().finally(() => process.exit());
}

module.exports = seedDB;
