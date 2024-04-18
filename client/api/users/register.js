const connectToDatabase = require('../../configs/dbConnect');
const User = require('../../models/User');

module.exports = async (req, res) => {
  await connectToDatabase();

  const { username, password, level, isActive } = req.body;

  try {
    const newUser = new User({
      username,
      password,
      level,
      isActive,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to create user.', details: error.message });
  }
};
