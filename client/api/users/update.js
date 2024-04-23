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

      const { id } = req.query;
      const updateData = req.body;

      if (
        req.user.id === id &&
        updateData.isActive !== undefined &&
        !updateData.isActive
      ) {
        return res
          .status(403)
          .json({ message: 'You cannot deactivate your own account' });
      }

      const errors = validateUserForm(updateData);
      if (Object.keys(errors).length > 0) {
        return res
          .status(400)
          .json({ error: 'Validation failed', details: errors });
      }

      try {
        const fieldsToUpdate = {};
        if (updateData.username) fieldsToUpdate.username = updateData.username;
        if (updateData.level) fieldsToUpdate.level = updateData.level;
        if (updateData.isActive !== undefined)
          fieldsToUpdate.isActive = updateData.isActive;
        if (updateData.password) fieldsToUpdate.password = updateData.password;

        const updatedUser = await User.findByIdAndUpdate(id, fieldsToUpdate, {
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
    });
  });
};
