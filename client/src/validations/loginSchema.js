import * as yup from 'yup';

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .max(20, 'Username must be at most 20 characters long'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long')
    .max(20, 'Password must be at most 20 characters long')
    .matches(
      /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/,
      'Password must contain at least one letter and one number'
    ),
});

export default loginSchema;
