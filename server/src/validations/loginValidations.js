// Username validation
const validateUsername = (username) => {
  if (!username) {
    return 'Username is required';
  }
  if (username.length > 20) {
    return 'Username must be at most 20 characters long';
  }
  return '';
};

// Password validation
const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 6 || password.length > 20) {
    return 'Password must be 6-20 characters long';
  }
  if (!/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/.test(password)) {
    return 'Password must contain at least one letter and one number';
  }
  return '';
};

// Function to validate all login fields and return errors
const validateLoginForm = ({ username, password }) => {
  let errors = {};

  const usernameError = validateUsername(username);
  if (usernameError) errors.username = usernameError;

  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;

  return errors;
};

module.exports = { validateLoginForm };
