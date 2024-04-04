const express = require('express');
const router = express.Router();
const programmingLanguagesController = require('../controllers/programmingLanguagesController');

router.get(
  '/programming-languages',
  programmingLanguagesController.getAllProgrammingLanguages
);

module.exports = router;
