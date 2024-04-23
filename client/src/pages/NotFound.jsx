import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const mainContentStyle = { minHeight: 'calc(100vh - 60px)' };

const NotFound = () => {
  useEffect(() => {
    document.title = '404: Not Found';
  }, []);

  return (
    <div
      style={mainContentStyle}
      className='flex items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-200 overflow-auto pb-20'
    >
      <div
        className='text-center font-mono bg-emerald-400 hover:bg-emerald-300 drop-shadow-sm text-black font-bold p-16 rounded-lg dark:bg-blue-800 dark:text-white dark:hover:bg-blue-700'
        title='Return Home'
        style={{ fontFamily: '"Fira Code", monospace' }}
      >
        <Link to='/'>
          <h1 className='text-9xl font-bold text-gray-800 dark:text-gray-200 '>
            4{' '}
            <span className='text-blue-500 dark:text-blue-300'>&lt;/&gt;</span>{' '}
            4
          </h1>
          <pre className='text-left inline-block mt-4 text-3xl text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 rounded-lg p-4 drop-shadow-sm'>
            <code>
              <span className='text-pink-500'>Error404</span> () {'{'}
              <br />
              &nbsp;&nbsp;message:{' '}
              <span className='text-green-500'>"page not found"</span>;
              <br />
              {'}'}
            </code>
          </pre>
        </Link>
      </div>
      <div className='absolute bottom-12 right-20'>
        <Link
          to='/'
          className='bg-emerald-400 hover:bg-emerald-300  drop-shadow-sm text-black font-bold py-2 px-4 rounded dark:bg-blue-800 dark:text-white dark:hover:bg-blue-700'
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
