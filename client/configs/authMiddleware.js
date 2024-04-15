const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    res.status(401).json({ isValid: false, error: 'No token provided' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      res.status(403).json({ isValid: false, error: 'Token is invalid' });
      return;
    }
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.level === 'admin' || req.user.level === 'super') {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
};

const isSuperAdmin = (req, res, next) => {
  if (req.user.level === 'super') {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
};

module.exports = {
  isAuthenticated,
  isAdmin,
  isSuperAdmin,
};
