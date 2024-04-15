const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const { validateLoginForm } = require('../../validations/loginValidations');

const mongoUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL
    : process.env.DATABASE_URL_DEV;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const login = async (req, res) => {
  const { username, password } = req.body;

  const errors = validateLoginForm({ username, password });
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const user = await User.findOne({ username: username });
    if (!user || !user.isActive) {
      return res
        .status(401)
        .json({ message: 'Incorrect username or inactive account.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    return res.json({
      message: 'Logged in successfully',
      user: { username: user.username, level: user.level },
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Authentication failed', error: error.message });
  }
};

module.exports = login;
