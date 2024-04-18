const connectToDatabase = require('../../configs/dbConnect');
const User = require('../../models/User');

module.exports = async (req, res) => {
  await connectToDatabase();

  const { id } = req.query;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.isActive) {
      return res.status(400).json({ message: 'User is already active.' });
    }
    user.isActive = true;
    await user.save();
    res.json({ message: 'User reactivated successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error reactivating user',
      error: error.message,
    });
  }
};
