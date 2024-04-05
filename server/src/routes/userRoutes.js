const express = require('express');
const router = express.Router();
const {
  createUser,
  getUsers,
  deleteUser,
  deactivateUser,
  reactivateUser,
} = require('../controllers/userController');
const { isAuthenticated, isSuperAdmin } = require('../configs/authMiddleware');

// Super Admin only
router.post('/register', isAuthenticated, isSuperAdmin, createUser);
router.get('/users', isAuthenticated, isSuperAdmin, getUsers);
router.delete('/user/delete/:id', isAuthenticated, isSuperAdmin, deleteUser);
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

module.exports = router;
