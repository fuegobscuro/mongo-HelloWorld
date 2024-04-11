import * as yup from 'yup';

const updateUserSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .max(20, 'Username must be at most 20 characters long'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(20, 'Password must be at most 20 characters long')
    .matches(
      /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/,
      'Password must contain at least one letter and one number'
    )
    .nullable(true), // Set to null to bypass the validation when not modified
  isActive: yup.boolean(),
  level: yup.string().required('User level is required'),
});

export default updateUserSchema;
