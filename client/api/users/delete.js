const connectToDatabase = require('../../configs/dbConnect');
const User = require('../../models/User');

module.exports = async (req, res) => {
  await connectToDatabase();

  const { id } = req.query;

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
};
