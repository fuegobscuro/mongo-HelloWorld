const jwt = require('jsonwebtoken');
const isAuthenticated = require('../../configs/authMiddleware').isAuthenticated;

module.exports = async (req, res) => {
  isAuthenticated(req, res, () => {
    const user = req.user;
    console.log(req.user);

    res.json({
      isValid: true,
      user: {
        id: user.id,
        username: user.username,
        level: user.level,
      },
    });
  });
};
