const connectToDatabase = require('../../configs/dbConnect');
const User = require('../../models/User');

module.exports = async (req, res) => {
  await connectToDatabase();

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'No ID provided' });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.isActive) {
      return res.status(400).json({ message: 'User already deactivated' });
    }

    user.isActive = false;
    await user.save();

    res.json({ message: 'User deactivated successfully' });
  } catch (error) {
    console.error('Error in operation', error);
    res
      .status(500)
      .json({ message: 'Error processing request', error: error.message });
  }
};
