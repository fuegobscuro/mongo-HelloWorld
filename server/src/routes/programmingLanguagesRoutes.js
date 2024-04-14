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
  '/programming-languages/create',
  isAuthenticated,
  isAdmin,
  createProgrammingLanguage
);
router.put(
  '/programming-languages/update/:id',
  isAuthenticated,
  isAdmin,
  updateProgrammingLanguage
);
router.patch(
  '/programming-languages/deactivate/:id',
  isAuthenticated,
  isAdmin,
  deactivateProgrammingLanguage
);
router.patch(
  '/programming-languages/reactivate/:id',
  isAuthenticated,
  isAdmin,
  reactivateProgrammingLanguage
);

// Super Admin only
router.delete(
  '/programming-languages/delete/:id',
  isAuthenticated,
  isSuperAdmin,
  deleteProgrammingLanguage
);

module.exports = router;
