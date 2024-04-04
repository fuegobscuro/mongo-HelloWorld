const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/contacts', contactController.getAllContacts);
router.post('/contact', contactController.createContact);
router.delete('/contact/:id', contactController.deleteContact);

module.exports = router;
