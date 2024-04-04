const connectDB = require('./src/database');
const server = require('./src/server');
const seedDB = require('./src/data/seedDB');
const PORT = process.env.PORT || 3001;

const startServer = () => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

const initializeApp = async () => {
  await connectDB(); // Ensure database connection
  await seedDB(); // Seed the database
  startServer();
};

initializeApp();
