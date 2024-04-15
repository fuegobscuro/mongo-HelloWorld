const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: 'No active session to terminate' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(`Logging out user: ${decoded.id}`);

    return res
      .status(200)
      .json({ message: 'Logged out successfully', user: decoded });
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Invalid token', error: error.message });
  }
};
