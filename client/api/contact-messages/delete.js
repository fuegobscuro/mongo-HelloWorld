const connectToDatabase = require('../../configs/dbConnect');
const Contact = require('../../models/Contact');
const {
  isAuthenticated,
  isSuperAdmin,
} = require('../../configs/authMiddleware');

module.exports = async (req, res) => {
  isAuthenticated(req, res, () => {
    isSuperAdmin(req, res, async () => {
      const { id } = req.query;
      try {
        await connectToDatabase();
        const contact = await Contact.findOne({ _id: id });
        if (!contact) {
          return res.status(404).json({ message: 'Contact message not found' });
        }
        await contact.deleteOne();
        res.json({
          message: 'Contact message deleted successfully',
          contact: contact,
        });
      } catch (error) {
        console.error('Error in delete operation:', error);
        res.status(500).json({
          message: 'Error deleting contact message',
          error: error.message,
        });
      }
    });
  });
};
