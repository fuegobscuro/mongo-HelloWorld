import React from 'react';

const LoadingButton = () => {
  return (
    <div className='flex items-center justify-center p-5 hover:bg-blue-600 font-bold rounded transition duration-150 ease-in-out bg-emerald-400 text-gray-900 dark:bg-blue-900 dark:text-white drop-shadow-xl'>
      <svg
        className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
      >
        <circle
          className='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          strokeWidth='4'
        ></circle>
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        ></path>
      </svg>
      Loading...
    </div>
  );
};

export default LoadingButton;
