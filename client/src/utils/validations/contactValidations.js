export const validateContactForm = (contact) => {
  const errors = {};

  // Name validation
  if (contact.name.length === 0 || contact.name.length > 50) {
    errors.name = 'Please enter a valid name (1-50 characters).';
  }

  // Mail validation
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(String(contact.mail).toLowerCase())) {
    errors.mail = 'Please enter a valid email.';
  }

  // Message validation
  if (contact.message.length === 0 || contact.message.length > 500) {
    errors.message = 'Please enter a message (1-500 characters).';
  }

  return errors;
};
