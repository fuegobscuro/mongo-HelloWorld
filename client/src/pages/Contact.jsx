import React from 'react';
import ContactForm from '../components/ContactForm';
import { Link } from 'react-router-dom';

const Contact = () => {
  const mainContentStyle = { minHeight: 'calc(100vh - 60px)' };

  return (
    <div
      style={mainContentStyle}
      className='bg-gray-100 dark:bg-gray-800 px-4 py-2 overflow-auto'
    >
      <h1 className='text-center text-3xl font-semibold dark:text-white mt-2 mb-2'>
        <b>Contact Us</b>
      </h1>
      <ContactForm />
      <div className='w-full flex justify-end pr-40 pt-4'>
        <Link
          to='/'
          className='bg-gray-300 hover:bg-yellow-200 text-black font-bold py-2 px-4 rounded dark:invert'
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Contact;
