const connectToDatabase = require('../../configs/dbConnect');
const User = require('../../models/User');

module.exports = async (req, res) => {
  try {
    await connectToDatabase();

    const users = await User.find(
      {},
      'username password level isActive createdAt updatedAt'
    );

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
};
