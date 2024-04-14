const express = require('express');
const router = express.Router();
const {
  getAllProgrammingLanguages,
  createProgrammingLanguage,
  updateProgrammingLanguage,
  deactivateProgrammingLanguage,
  reactivateProgrammingLanguage,
  deleteProgrammingLanguage,
} = require('../controllers/programmingLanguagesController');
const {
  isAuthenticated,
  isSuperAdmin,
  isAdmin,
} = require('../configs/authMiddleware');

// Public
router.get('/programming-languages', getAllProgrammingLanguages);

// Admin only
router.post(
  '/create-language',
  isAuthenticated,
  isAdmin,
  createProgrammingLanguage
);
router.put(
  '/update-language/:id',
  isAuthenticated,
  isAdmin,
  updateProgrammingLanguage
);
router.patch(
  '/deactivate-language/:id',
  isAuthenticated,
  isAdmin,
  deactivateProgrammingLanguage
);
router.patch(
  '/reactivate-language/:id',
  isAuthenticated,
  isAdmin,
  reactivateProgrammingLanguage
);

// Super Admin only
router.delete(
  '/delete-language/:id',
  isAuthenticated,
  isSuperAdmin,
  deleteProgrammingLanguage
);

module.exports = router;
