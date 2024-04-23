// Name validation
const validateName = (name) => {
  if (!name || name.length === 0) {
    return "Name can't be blank";
  } else if (name.length > 30) {
    return 'Name must be less than 30 characters';
  }
  return '';
};

// Year validation
const validateYear = (year) => {
  const currentYear = new Date().getFullYear();
  if (year === undefined) {
    return "Year can't be blank";
  } else if (year < 1901) {
    return 'Year must be after 1900';
  } else if (year > currentYear) {
    return "Year can't be set in the future";
  }
  return '';
};

// Creator validation
const validateCreator = (creator) => {
  if (!creator) {
    return "Creator can't be blank";
  } else if (creator.length > 55) {
    return 'Creator must be less than 55 characters';
  }
  return '';
};

// Description validation
const validateDescription = (description) => {
  if (!description) {
    return "Description can't be blank";
  } else if (description.length > 200) {
    return 'Description must be less than 200 characters';
  }
  return '';
};

// Hello World Code validation
const validateHelloWorldCode = (code) => {
  if (!code) {
    return "'Hello, World!' Code can't be blank";
  }
  return '';
};

// TIOBE Rank validation
const validateTiobeRank = (rank) => {
  if (rank === undefined) {
    return "TIOBE Rank can't be blank";
  } else if (rank > 200) {
    return 'TIOBE Rank must be less than 200';
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
const validateProgrammingLanguageForm = (data) => {
  let errors = {};

  if ('name' in data) {
    errors.name = validateName(data.name);
  }
  if ('year' in data) {
    errors.year = validateYear(data.year);
  }
  if ('creator' in data) {
    errors.creator = validateCreator(data.creator);
  }
  if ('description' in data) {
    errors.description = validateDescription(data.description);
  }
  if ('helloWorldCode' in data) {
    errors.helloWorldCode = validateHelloWorldCode(data.helloWorldCode);
  }
  if ('tiobeRank' in data) {
    errors.tiobeRank = validateTiobeRank(data.tiobeRank);
  }

  // Filter out non-error fields (where the error message is '')
  return filterErrors(errors);
};

module.exports = { validateProgrammingLanguageForm };
