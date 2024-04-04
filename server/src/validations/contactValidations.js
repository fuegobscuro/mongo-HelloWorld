// Name validation
const validateName = (name) => {
  if (!name || name.length === 0 || name.length > 50) {
    return 'Please enter a valid name (1-50 characters).';
  }
  return '';
};

// Mail validation
const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(email).toLowerCase())) {
    return 'Please enter a valid email.';
  }
  return '';
};

// Message validation
const validateMessage = (message) => {
  if (!message || message.length === 0 || message.length > 500) {
    return 'Please enter a message (1-500 characters).';
  }
  return '';
};

// Function to validate all fields and return errors
const validateContactForm = ({ name, mail, message }) => {
  let errors = {};

  const nameError = validateName(name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(mail);
  if (emailError) errors.mail = emailError;

  const messageError = validateMessage(message);
  if (messageError) errors.message = messageError;

  return errors;
};

module.exports = { validateContactForm };
