import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUserLevel } from '../../redux/actions';
import { useFormik } from 'formik';
import loginSchema from '../../validations/loginSchema';
import LoadingButton from '../../components/common/LoadingButton';
import MySwal from '../../configs/swalConfig';

function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token =
    useSelector((state) => state.token) || localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    document.title = 'Admin Login';

    if (token) {
      navigate('/admin-dashboard');
    }
  }, [token, navigate]);

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post('/auth/login', values)
        .then((response) => {
          localStorage.setItem('token', response.data.token);
          dispatch(setToken(response.data.token));
          dispatch(setUserLevel(response.data.user.level));
          navigate('/admin-dashboard');
        })
        .catch((error) => {
          console.error('Login error:', error.response.data);
          MySwal.fire({
            title: 'Login failed!',
            html: `<span class="text-gray-400">${error.response.data.message}</span>`,
            icon: 'error',
          });
        })
        .finally(() => setLoading(false));
    },
  });

  const mainContentStyle = { minHeight: 'calc(100vh - 60px)' };

  return (
    <div
      style={mainContentStyle}
      className='flex items-center justify-center min-h-screen bg-gray-200 pb-20 overflow-auto'
    >
      <div
        className='flex flex-col items-center bg-green-100 dark:bg-gray-800 rounded-lg py-4 px-16 shadow-md drop-shadow-md m-3'
        style={{ maxWidth: '600px' }}
      >
        <div className='w-full mx-auto'>
          <h1 className='text-center text-3xl font-bold text-gray-900 dark:text-white px-2 mb-4 drop-shadow-sm'>
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
            <div className='w-full flex justify-center pt-4'>
              <button
                type='submit'
                className='bg-emerald-400 hover:bg-emerald-300 drop-shadow-md text-black font-bold py-2 px-4 rounded dark:bg-blue-800 dark:text-white dark:hover:bg-blue-700'
              >
                {loading ? <LoadingButton /> : 'Sign In'}
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

export default AdminLogin;
