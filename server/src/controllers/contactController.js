const Contact = require('../models/Contact');

// GET ALL CONTACT FORM MESSAGES
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.json(contacts);
  } catch (error) {
    res.status(500).send(error);
  }
};

// POST CONTACT FORM MESSAGE
exports.createContact = async (req, res) => {
  try {
    const { name, mail, message } = req.body;
    const newContact = new Contact({ name, mail, message });
    await newContact.save();
    res.status(201).json({
      message: 'Contact form submitted successfully',
      data: newContact,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

// DELETE CONTACT FORM MESSAGE
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact entry not found' });
    }
    res.json({
      message: 'Contact entry deleted successfully',
      data: deletedContact,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
