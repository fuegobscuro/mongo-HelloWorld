// Middleware for checking authentication
const isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};

// Middleware for checking admin level
const isAdmin = function (req, res, next) {
  if (
    req.isAuthenticated() &&
    (req.user.level === 'admin' || req.user.level === 'super')
  ) {
    return next();
  }
  res.status(403).json({ message: 'Forbidden' });
};

// Middleware for checking super admin level
const isSuperAdmin = function (req, res, next) {
  if (req.isAuthenticated() && req.user.level === 'super') {
    return next();
  }
  res.status(403).json({ message: 'Forbidden' });
};

// Middleware for checking if user is already logged in when trying to login
const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // User is already logged in, send an appropriate response or redirect
    return res.status(400).json({ message: 'Already logged in.' });
  }
  next(); // User is not logged in, proceed with the login process
};

module.exports = {
  isAuthenticated,
  isAdmin,
  isSuperAdmin,
  checkNotAuthenticated,
};
