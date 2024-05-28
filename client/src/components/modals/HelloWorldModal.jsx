import React from 'react';

const HelloWorldModal = ({ onClose, children, langName }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center'>
      <div
        className={
          'relative mx-auto p-5 border-2 border-gray-600 bg-green-100 dark:bg-gray-800 shadow-md drop-shadow-md rounded-lg'
        }
        style={{ width: '80%', maxWidth: '640px' }}
      >
        <div className='flex justify-between items-center text-center mb-1'>
          <h3 className='text-lg leading-6 font-medium text-gray-900 dark:text-white'>
            Here's a <b>'Hello, World!'</b> in{' '}
            <b className='text-indigo-800 text-xl dark:text-emerald-600'>
              {langName}
            </b>{' '}
            !
          </h3>
          <button
            onClick={onClose}
            className='text-black font-bold bg-emerald-400 hover:bg-emerald-300 rounded-lg text-sm p-1 ml-auto inline-flex items-center drop-shadow-sm shadow-sm dark:bg-blue-800 dark:text-white dark:hover:bg-blue-700'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <div
          className='mt-1 overflow-auto drop-shadow-sm'
          style={{ maxHeight: '80vh' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default HelloWorldModal;
