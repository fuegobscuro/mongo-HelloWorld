const connectToDatabase = require('../../configs/dbConnect');
const User = require('../../models/User');

module.exports = async (req, res) => {
  await connectToDatabase();

  const { id } = req.query;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: 'Error updating user',
      error: error.message,
    });
  }
};
