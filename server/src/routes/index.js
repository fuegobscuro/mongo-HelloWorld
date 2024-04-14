const express = require('express');
// Route imports:
const programmingLanguagesRoutes = require('./programmingLanguagesRoutes');
const contactRoutes = require('./contactRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.use(programmingLanguagesRoutes);
router.use(contactRoutes);
router.use(authRoutes);
router.use(userRoutes);

module.exports = router;
