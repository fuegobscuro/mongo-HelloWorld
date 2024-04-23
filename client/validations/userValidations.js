// Username validation
const validateUsername = (username) => {
  if (!username) {
    return 'Username is required';
  } else if (username.length > 20) {
    return 'Username must be at most 20 characters long';
  }
  return '';
};

// Password validation
const validatePassword = (password) => {
  if (password === null || typeof password === 'undefined') {
    return ''; // If password is not provided, return no error (since it's optional for updates)
  } else if (password.length < 6 || password.length > 20) {
    return 'Password must be 6-20 characters long';
  } else if (!/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/.test(password)) {
    return 'Password must contain at least one letter and one number';
  }
  return '';
};

// User level validation
const validateUserLevel = (level) => {
  if (!level) {
    return 'User level is required';
  }
  return '';
};

// Error filtering function
const filterErrors = (errors) => {
  const filteredErrors = {};
  Object.keys(errors).forEach((key) => {
    if (errors[key] !== '') {
      filteredErrors[key] = errors[key];
    }
  });
  return filteredErrors;
};

// Main validation function
const validateUserForm = (data) => {
  let errors = {};

  if ('username' in data) {
    errors.username = validateUsername(data.username);
  }
  if ('password' in data) {
    errors.password = validatePassword(data.password);
  }
  if ('level' in data) {
    errors.level = validateUserLevel(data.level);
  }

  return filterErrors(errors);
};

module.exports = { validateUserForm };
