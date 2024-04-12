const connectDB = require('./src/database');
const server = require('./src/server');
// const seedDB = require('./src/data/seedDB');
require('dotenv').config();
const PORT = process.env.PORT || 3001;

const startServer = () => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

async function initializeApp() {
  try {
    await connectDB();
    // await seedDB();
    startServer();
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
}

initializeApp();
