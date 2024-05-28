import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingAnimation from '../../components/common/LoadingAnimation';

const Analytics = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Admin: Analytics';
  }, []);

  if (loading) {
    return <LoadingAnimation />;
  }

  const mainContentStyle = { minHeight: 'calc(100vh - 72px)' };

  return (
    <div
      style={mainContentStyle}
      className='bg-gray-200 dark:bg-gray-200 flex flex-col justify-top items-center overflow-auto px-4 py-6'
    >
      <div className='w-full max-w-4xl bg-green-100 dark:bg-gray-800 shadow-2xl dark:shadow-lg rounded-lg p-4'>
        <div className='flex justify-between'>
          <h2 className='text-2xl px-1 font-bold text-indigo-800 drop-shadow-xl dark:text-emerald-400 mb-4 flex justify-start'>
            Analytics
          </h2>

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
      </div>
    </div>
  );
};

export default Analytics;
