const passport = require('passport');

const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ message: 'Logged in successfully', user });
    });
  })(req, res, next);
};

const logout = (req, res) => {
  const userInfo = { username: req.user.username, level: req.user.level };
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.clearCookie('connect.sid', { path: '/' }); // Use the correct cookie name and path
      res.json({ message: 'Logged out successfully', userInfo });
    });
  });
};

const getSessionInfo = function (req, res) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'User is not authenticated' });
  }

  res.json({
    message: 'User is authenticated',
    user: {
      id: req.user._id,
      username: req.user.username,
      level: req.user.level,
    },
  });
};

module.exports = {
  login,
  logout,
  getSessionInfo,
};
