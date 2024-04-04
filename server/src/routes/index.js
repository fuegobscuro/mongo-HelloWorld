const express = require('express');
// Route imports:
const programmingLanguagesRoutes = require('./programmingLanguagesRoutes');
const contactRoutes = require('./contactRoutes');

const router = express.Router();

router.use(programmingLanguagesRoutes);
router.use(contactRoutes);

module.exports = router;
