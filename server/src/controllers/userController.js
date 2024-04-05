const User = require('../models/User');

// Create a new user (admin or super admin)
exports.createUser = async (req, res) => {
  const { username, password, level } = req.body;

  try {
    const newUser = new User({
      username,
      password,
      level,
    });

    await newUser.save();

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        level: newUser.level,
        dateRegistered: newUser.dateRegistered,
        isActive: newUser.isActive,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB duplicate key error code
      return res.status(409).json({ message: 'Username already exists' });
    }
    res
      .status(500)
      .json({ message: 'Failed to create user', error: error.message });
  }
};

// Get list of users (super admin only)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username level dateRegistered isActive');
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to retrieve users', error: error.message });
  }
};

// Delete user (super admin only)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to delete user', error: error.message });
  }
};

// Deactivate user (super admin only)
exports.deactivateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Check if user is already deactivated
    if (!user.isActive) {
      return res.status(400).json({ message: 'User is already deactivated.' });
    }
    const deactivatedUser = await User.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    res.json({
      message: 'User deactivated successfully',
      user: deactivatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to deactivate user', error: error.message });
  }
};

// Reactivate user (super admin only)
exports.reactivateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Check if user is already active
    if (user.isActive) {
      return res.status(400).json({ message: 'User is already active.' });
    }
    const reactivatedUser = await User.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true }
    );
    res.json({
      message: 'User reactivated successfully',
      user: reactivatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to reactivate user', error: error.message });
  }
};
