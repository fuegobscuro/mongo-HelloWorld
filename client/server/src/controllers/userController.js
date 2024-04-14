const User = require('../models/User');

// Get list of users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find(
      {},
      'username password level isActive createdAt updatedAt'
    );
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to retrieve users', error: error.message });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  const { username, password, level, isActive } = req.body;

  try {
    const newUser = new User({
      username,
      password,
      level,
      isActive,
    });

    await newUser.save();

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        level: newUser.level,
        isActive: newUser.isActive,
        createdAt: newUser.createdAt,
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

// Update user details
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  let updateData = req.body;

  // If the password field is undefined (indicating it should not be updated),
  // remove it from the updateData object
  if (updateData.password === undefined) {
    delete updateData.password;
  }

  try {
    // Make sure to only pass fields that exist in updateData to the update operation.
    // The {new: true} option returns the document after update was applied.
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User updated successfully',
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        level: updatedUser.level,
        isActive: updatedUser.isActive,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      // Handling duplicate username error
      return res.status(409).json({ message: 'Username already exists' });
    }
    res
      .status(500)
      .json({ message: 'Failed to update user', error: error.message });
  }
};

// Deactivate user
exports.deactivateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

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

// Reactivate user
exports.reactivateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

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

// Delete user
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
