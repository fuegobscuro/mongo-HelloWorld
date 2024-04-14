const connectDB = require('./src/database');
const app = require('./src/server');
// const seedDB = require('./src/data/seedDB');
require('dotenv').config();

async function initializeApp() {
  try {
    await connectDB();
    // await seedDB();

    if (process.env.NODE_ENV === 'development') {
      const PORT = process.env.PORT || 3001;
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    }
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
}

initializeApp();

module.exports = app;
