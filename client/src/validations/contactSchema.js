import * as yup from 'yup';

const contactSchema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter a valid name (1-50 characters).')
    .max(50),
  mail: yup
    .string()
    .email('Please enter a valid email.')
    .required('Email is required.'),
  message: yup
    .string()
    .required('Please enter a message (1-500 characters).')
    .max(500),
});

export default contactSchema;
