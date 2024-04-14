const passport = require('passport');
const { validateLoginForm } = require('../validations/loginValidations');

const login = (req, res, next) => {
  const { username, password } = req.body;

  // Use the validation function
  const errors = validateLoginForm({ username, password });
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({
        message: 'Logged in successfully',
        user: { username: user.username, level: user.level },
      });
    });
  })(req, res, next);
};

const logout = (req, res) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out successfully' });
      });
    });
  } else {
    res.status(400).json({ message: 'No active session to terminate' });
  }
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
