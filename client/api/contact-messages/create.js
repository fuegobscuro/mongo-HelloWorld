const mongoose = require('mongoose');
const Contact = require('../../models/Contact');
const { validateContactForm } = require('../../validations/contactValidations');

const mongoUrl = process.env.DATABASE_URL || process.env.DATABASE_URL_DEV;

const connectToDatabase = async () => {
  if (mongoose.connection.readyState !== 1) {
    return mongoose.connect(mongoUrl);
  }
  return Promise.resolve();
};

module.exports = async (req, res) => {
  try {
    await connectToDatabase();

    const { name, mail, message } = req.body;

    const errors = validateContactForm({ name, mail, message });
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: 'Validation errors',
        errors,
      });
    }

    const newContact = new Contact({ name, mail, message });
    await newContact.save();
    res.status(201).json({
      message: 'Contact form submitted successfully',
      data: newContact,
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'Failed to submit contact form.' });
  }
};
