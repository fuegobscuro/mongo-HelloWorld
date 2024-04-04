// Name validation
export const validateName = (name) => {
  return name.length > 0 && name.length <= 50;
};

// Mail validation
export const validateEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// Message validation
export const validateMessage = (message) => {
  return message.length > 0 && message.length <= 500;
};
