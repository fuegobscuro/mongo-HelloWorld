const connectDB = require('./src/database');
const app = require('./src/server');
require('dotenv').config();
// const seedDB = require('./src/data/seedDB');

async function initializeApp() {
  try {
    await connectDB();
    // await seedDB();
    // startServer();
    if (process.env.NODE_ENV === 'development') {
      const PORT = process.env.PORT || 3001;
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
      console.log('Connected to server successfully.');
    }
  } catch (error) {
    console.error('Failed to connect to the server:', error);
    process.exit(1);
  }
}

initializeApp();

module.exports = app;
