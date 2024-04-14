require('dotenv').config();
const connectDB = require('./src/database');
const app = require('./src/server');
// const seedDB = require('./src/data/seedDB');

app.use((req, res, next) => {
  console.log('Received request:', req.method, req.path);
  next();
});

async function initializeApp() {
  try {
    await connectDB();
    // await seedDB();

    if (process.env.NODE_ENV === 'development') {
      const PORT = process.env.PORT || 3001;
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } else {
      console.log('Server running in production mode');
    }
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
}

initializeApp();

module.exports = app;
