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

router.post('/login', checkNotAuthenticated, login);
router.get('/logout', isAuthenticated, logout);
router.get('/session', getSessionInfo);

module.exports = router;
