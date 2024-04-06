import React from 'react';
import { useTheme } from '../components/ThemeContext';

const Modal = ({ onClose, children, langName }) => {
  const { theme } = useTheme();
  const modalClasses =
    theme === 'dark'
      ? 'bg-gray-800 text-white' // Dark mode styles
      : 'bg-white text-gray-900'; // Light mode styles

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center'>
      <div
        className={`${modalClasses} relative mx-auto p-5 border shadow-lg rounded-md`}
        style={{ width: '80%', maxWidth: '640px' }}
      >
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-lg leading-6 font-medium'>
            Here's a <b>'Hello, World!'</b> in{' '}
            <b className='text-indigo-800 dark:text-emerald-600'>{langName}</b>{' '}
            !
          </h3>
          <button
            onClick={onClose}
            className='text-black font-bold bg-gray-300 hover:bg-yellow-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:invert'
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
        <div className='mt-2 overflow-auto' style={{ maxHeight: '80vh' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
