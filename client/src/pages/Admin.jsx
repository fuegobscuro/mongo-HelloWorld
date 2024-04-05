import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '../redux/actions';

function Admin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [loginError, setLoginError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    document.title = 'Admin Login';
  }, []);

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/login', credentials)
      .then((response) => {
        console.log('Login successful:', response.data);
        dispatch(setAuthenticated()); // Dispatch setAuthenticated action
        navigate('/admin-dashboard'); // Navigate to admin-dashboard
      })
      .catch((error) => {
        console.error('Login error:', error);
        setLoginError('Failed to login. Please check your credentials.');
      });
  };

  const mainContentStyle = { minHeight: 'calc(100vh - 60px)' };

  return (
    <div
      style={mainContentStyle}
      className='flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 px-4 py-2 overflow-auto'
    >
      <div className='max-w-md w-full mx-auto' style={{ marginTop: '-5rem' }}>
        {' '}
        {/* Adjusted line */}
        <h1 className='text-center text-3xl font-bold dark:text-white mt-2 mb-4'>
          Admin Login
        </h1>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username' className='sr-only'>
              Username
            </label>
            <input
              type='text'
              name='username'
              id='username'
              value={credentials.username}
              onChange={handleInputChange}
              className='h-8 mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              placeholder='Username'
              required
            />
          </div>
          <div>
            <label htmlFor='password' className='sr-only'>
              Password
            </label>
            <div className='relative'>
              <input
                type={passwordVisible ? 'text' : 'password'}
                name='password'
                id='password'
                value={credentials.password}
                onChange={handleInputChange}
                className='h-8 pl-2 pr-10 block w-full rounded-md border-gray-300 shadow-sm border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                placeholder='Password'
                required
              />
              <button
                type='button'
                onClick={() => setPasswordVisible(!passwordVisible)}
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
              >
                {passwordVisible ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          {loginError && (
            <div className='text-red-500 text-sm'>{loginError}</div>
          )}
          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded text-black bg-gray-300 hover:bg-yellow-200 drop-shadow-sm  dark:invert'
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
