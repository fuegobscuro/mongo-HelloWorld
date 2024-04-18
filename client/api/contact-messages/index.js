const connectToDatabase = require('../../configs/dbConnect');
const Contact = require('../../models/Contact');

module.exports = async (req, res) => {
  try {
    await connectToDatabase();

    const messages = await Contact.find({});

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ error: 'Failed to fetch contact messages.' });
  }
};
