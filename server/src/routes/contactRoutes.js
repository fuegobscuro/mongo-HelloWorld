const express = require('express');
const router = express.Router();
const {
  createContact,
  getAllContactMessages,
  deleteContact,
} = require('../controllers/contactController');
const {
  isAuthenticated,
  isAdmin,
  isSuperAdmin,
} = require('../configs/authMiddleware');

// Public
router.post('/contact-message/create', createContact);

// Admin and Super Admin only
router.get(
  '/contact-messages',
  isAuthenticated,
  isAdmin,
  getAllContactMessages
);

// Super Admin only
router.delete(
  '/contact-message/:id',
  isAuthenticated,
  isSuperAdmin,
  deleteContact
);

module.exports = router;
