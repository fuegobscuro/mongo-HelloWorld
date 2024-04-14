import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '../../redux/actions';
import { useFormik } from 'formik';
import loginSchema from '../../validations/loginSchema';
import LoadingAnimation from '../../components/common/LoadingAnimation';

function Admin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    document.title = 'Admin Login';
    axios
      .get('/auth/session')
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
      setLoading(true);
      axios
        .post('/auth/login', values)
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
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  const mainContentStyle = { minHeight: 'calc(100vh - 60px)' };

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div
      style={mainContentStyle}
      className='flex items-center justify-center min-h-screen bg-gray-200 pb-20 overflow-auto'
    >
      <div
        className='flex flex-col items-center bg-green-100 dark:bg-gray-800 rounded-lg p-12 shadow-md drop-shadow-md m-3'
        style={{ maxWidth: '600px' }}
      >
        <div className='w-full mx-auto'>
          <h1 className='text-center text-3xl font-bold text-gray-900 dark:text-white px-2 mb-6 drop-shadow-sm'>
            Admin Login
          </h1>
          <form onSubmit={formik.handleSubmit} className='space-y-1'>
            <div>
              <label htmlFor='username' className='sr-only'>
                Username
              </label>
              <input
                type='text'
                id='username'
                {...formik.getFieldProps('username')}
                placeholder='Username'
                className='h-12 mt-1 pl-3 block w-full rounded-md border-gray-300 shadow-sm border-2 drop-shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
              />
              {formik.touched.username && formik.errors.username && (
                <div className='text-red-500 text-sm'>
                  {formik.errors.username}
                </div>
              )}
            </div>
            <div className='relative mb-6'>
              <div className='relative'>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id='password'
                  {...formik.getFieldProps('password')}
                  placeholder='Password'
                  className='h-12 pl-3 pr-12 block w-full rounded-md border-gray-300 shadow-sm border-2 drop-shadow-sm dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
                />
                <button
                  type='button'
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
                  style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                  {passwordVisible ? '🙈' : '👁️'}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className='text-red-500 text-sm mt-2'>
                  {formik.errors.password}
                </div>
              )}
            </div>
            <div className='w-full flex justify-center pt-8'>
              <button
                type='submit'
                className='bg-emerald-400 hover:bg-emerald-300 drop-shadow-md text-black font-bold py-3 px-6 rounded dark:bg-blue-800 dark:text-white dark:hover:bg-blue-700'
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='absolute bottom-12 right-20'>
        <Link
          to='/'
          className='bg-emerald-400 hover:bg-emerald-300 drop-shadow-sm text-black font-bold py-2 px-4 rounded dark:bg-blue-800 dark:text-white dark:hover:bg-blue-700'
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default Admin;
