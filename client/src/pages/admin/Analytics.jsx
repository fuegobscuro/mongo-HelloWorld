import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Analytics = () => {
  useEffect(() => {
    document.title = 'Analytics';
  }, []);

  return (
    <div>
      <div>Analytics</div>

      <div className='fixed bottom-24 right-20'>
        <Link
          to='/admin-dashboard'
          className='bg-emerald-400 hover:bg-emerald-300 drop-shadow-sm text-black font-bold py-2 px-4 rounded dark:bg-blue-800 dark:text-white dark:hover:bg-blue-700'
        >
          Admin Dashboard
        </Link>
      </div>

      <div className='fixed bottom-12 right-20'>
        <Link
          to='/'
          className='bg-emerald-400 hover:bg-emerald-300 drop-shadow-sm text-black font-bold py-2 px-4 rounded dark:bg-blue-800 dark:text-white dark:hover:bg-blue-700'
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default Analytics;
