const express = require('express');
const router = express.Router();
const {
  login,
  logout,
  getSessionInfo,
} = require('../controllers/authController');
const {
  checkNotAuthenticated,
  isAuthenticated,
} = require('../configs/authMiddleware');

router.post('/auth/login', checkNotAuthenticated, login);
router.get('/auth/logout', isAuthenticated, logout);
router.get('/auth/session', getSessionInfo);

module.exports = router;
