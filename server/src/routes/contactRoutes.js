const express = require('express');
const router = express.Router();
const {
  createContact,
  getAllContacts,
  deleteContact,
} = require('../controllers/contactController');
const {
  isAuthenticated,
  isAdmin,
  isSuperAdmin,
} = require('../configs/authMiddleware');

// Public
router.post('/contact', createContact);

// Admin and Super Admin only
router.get('/contacts', isAuthenticated, isAdmin, getAllContacts);

// Super Admin only
router.delete('/contact/:id', isAuthenticated, isSuperAdmin, deleteContact);

module.exports = router;
