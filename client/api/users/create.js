const connectToDatabase = require('../../configs/dbConnect');
const User = require('../../models/User');
const { validateUserForm } = require('../../validations/userValidations');
const {
  isAuthenticated,
  isSuperAdmin,
} = require('../../configs/authMiddleware');

module.exports = async (req, res) => {
  isAuthenticated(req, res, () => {
    isSuperAdmin(req, res, async () => {
      await connectToDatabase();

      const { username, password, level, isActive } = req.body;

      const errors = validateUserForm({ username, password, level });
      if (Object.keys(errors).length > 0) {
        return res
          .status(400)
          .json({ error: 'Validation failed', details: errors });
      }

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
    });
  });
};
