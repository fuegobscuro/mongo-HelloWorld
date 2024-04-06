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
    return res.redirect('/admin-dashboard'); // Adjust according to your frontend routing
  }
  next();
};

module.exports = {
  isAuthenticated,
  isAdmin,
  isSuperAdmin,
  checkNotAuthenticated,
};
