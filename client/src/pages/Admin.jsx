import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '../redux/actions';
import { useFormik } from 'formik';
import loginSchema from '../validations/loginSchema';

function Admin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    document.title = 'Admin Login';
    axios
      .get('/session')
      .then((response) => {
        if (response.status === 200) {
          dispatch(setAuthenticated());
          navigate('/admin-dashboard');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch, navigate]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      axios
        .post('/login', values)
        .then((response) => {
          console.log('Login successful:', response.data);
          dispatch(setAuthenticated());
          navigate('/admin-dashboard');
        })
        .catch((error) => {
          console.error('Login error:', error);
          formik.setFieldError(
            'submit',
            'Failed to login. Please check your credentials.'
          );
        });
    },
  });

  const mainContentStyle = { minHeight: 'calc(100vh - 60px)' };

  return (
    <div
      style={mainContentStyle}
      className='flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 px-4 pt-2 pb-40 overflow-auto'
    >
      <div className='max-w-md w-full mx-auto'>
        <h1 className='text-center text-3xl font-bold dark:text-white mt-2 mb-4'>
          Admin Login
        </h1>
        <form onSubmit={formik.handleSubmit} className='mt-8 space-y-6'>
          {/* Username Input */}
          <div>
            <label htmlFor='username' className='sr-only'>
              Username
            </label>
            <input
              type='text'
              id='username'
              {...formik.getFieldProps('username')}
              placeholder='Username'
              className='h-8 mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
            />
            {formik.touched.username && formik.errors.username && (
              <div className='text-red-500 text-sm'>
                {formik.errors.username}
              </div>
            )}
          </div>

          {/* Insert Password Input with Visibility Toggle Here */}
          <div className='relative mb-4'>
            {' '}
            {/* Add margin for error message space */}
            <div className='relative'>
              <input
                type={passwordVisible ? 'text' : 'password'}
                id='password'
                {...formik.getFieldProps('password')}
                placeholder='Password'
                className='h-8 pl-2 pr-10 block w-full rounded-md border-gray-300 shadow-sm border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
                // Keeping the original styling for the input
              />
              <button
                type='button'
                onClick={() => setPasswordVisible(!passwordVisible)}
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
                style={{ top: '50%', transform: 'translateY(-50%)' }} // Adjust this to ensure button alignment
              >
                {passwordVisible ? '🙈' : '👁️'}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className='text-red-500 text-sm mt-1'>
                {formik.errors.password}
              </div>
            )}
          </div>

          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent  font-bold rounded text-black bg-gray-300 hover:bg-yellow-200 drop-shadow-sm  dark:invert'
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
      <div className='absolute bottom-10 right-20'>
        <Link
          to='/'
          className='bg-gray-300 drop-shadow-sm hover:bg-yellow-200 text-black font-bold py-2 px-4 rounded dark:invert'
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default Admin;
