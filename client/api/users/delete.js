const connectToDatabase = require('../../configs/dbConnect');
const User = require('../../models/User');
const {
  isAuthenticated,
  isSuperAdmin,
} = require('../../configs/authMiddleware');

module.exports = async (req, res) => {
  isAuthenticated(req, res, () => {
    isSuperAdmin(req, res, async () => {
      await connectToDatabase();

      const { id } = req.query;

      if (req.user.id === id) {
        return res
          .status(403)
          .json({ message: 'You cannot delete your own account' });
      }

      try {
        const user = await User.findOne({ _id: id });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        await user.deleteOne();

        res.json({
          message: 'User deleted successfully',
          user: user,
        });
      } catch (error) {
        console.error('Error in delete operation:', error);
        res.status(500).json({
          message: 'Error deleting user',
          error: error.message,
        });
      }
    });
  });
};
