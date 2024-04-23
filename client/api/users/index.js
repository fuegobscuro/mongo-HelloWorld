const connectToDatabase = require('../../configs/dbConnect');
const User = require('../../models/User');
const {
  isAuthenticated,
  isSuperAdmin,
} = require('../../configs/authMiddleware');

module.exports = async (req, res) => {
  isAuthenticated(req, res, () => {
    isSuperAdmin(req, res, async () => {
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
    });
  });
};
