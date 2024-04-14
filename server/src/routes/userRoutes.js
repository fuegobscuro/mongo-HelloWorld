const express = require('express');
const router = express.Router();
const {
  createUser,
  getUsers,
  deleteUser,
  deactivateUser,
  reactivateUser,
  updateUser,
} = require('../controllers/userController');
const { isAuthenticated, isSuperAdmin } = require('../configs/authMiddleware');

// Super Admin only
router.get('/users', isAuthenticated, isSuperAdmin, getUsers);
router.post('/user/register', isAuthenticated, isSuperAdmin, createUser);
router.patch('/user/update/:id', isAuthenticated, isSuperAdmin, updateUser);
router.patch(
  '/user/deactivate/:id',
  isAuthenticated,
  isSuperAdmin,
  deactivateUser
);
router.patch(
  '/user/reactivate/:id',
  isAuthenticated,
  isSuperAdmin,
  reactivateUser
);
router.delete('/user/delete/:id', isAuthenticated, isSuperAdmin, deleteUser);

module.exports = router;
