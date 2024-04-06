import React, { useEffect } from 'react';
import ContactForm from '../components/ContactForm';
import { Link } from 'react-router-dom';

const Contact = () => {
  useEffect(() => {
    document.title = 'Contact';
  }, []);

  const mainContentStyle = { minHeight: 'calc(100vh - 60px)' };

  return (
    <div
      style={mainContentStyle}
      className='bg-gray-100 dark:bg-gray-800 px-4 py-2 overflow-auto'
    >
      <h1 className='text-center text-3xl font-bold dark:text-white mt-2 mb-4'>
        Contact Form
      </h1>
      <ContactForm />
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
};

export default Contact;
