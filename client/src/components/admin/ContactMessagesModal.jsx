import React from 'react';
import { useSelector } from 'react-redux';

const ContactMessagesModal = ({ isOpen, data, onClose, onDelete }) => {
  const userLevel = useSelector((state) => state.userLevel);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center shadow-2xl drop-shadow-xl border'>
      <div className='relative p-6 bg-green-100 dark:bg-gray-800 shadow-md drop-shadow-md rounded-lg w-full max-w-3xl'>
        <div className='flex justify-between items-center text-md font-medium text-gray-800 dark:text-gray-300'>
          <span className='text-md font-medium text-gray-800 dark:text-gray-300'>
            <b className='text-lg'>Date: </b>
            {new Date(data.createdAt).toLocaleString().toLowerCase()}
          </span>

          <button
            onClick={onClose}
            className='flex justify-end border border-transparent bg-emerald-400 drop-shadow-sm shadow-sm text-sm hover:bg-emerald-300 text-black font-bold rounded-lg dark:bg-blue-800 dark:text-white dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 items-center p-1 ml-auto'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <span className='text-md font-medium text-gray-800 dark:text-gray-300'>
          <b className='text-lg'>Name: </b>
          {data.name}
          <span className='mx-4'>•</span>
          <b className='text-lg'>Email: </b> {data.mail}
        </span>

        <div className='mt-4 text-md font-medium text-gray-800 dark:text-gray-300'>
          <b className='text-lg'>Message:</b>
          <div className='flex justify-center p-6 ml-2'>{data.message}</div>
        </div>

        <div className='flex justify-end'>
          {userLevel === 'super' && (
            <button
              className='px-4 py-1 bg-red-400 hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-600 text-black dark:text-white font-bold rounded'
              onClick={() => {
                onDelete();
                onClose();
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactMessagesModal;
