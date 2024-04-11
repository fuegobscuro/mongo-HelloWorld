import React, { useEffect } from 'react';
import ContactForm from '../components/forms/ContactForm';
import { Link } from 'react-router-dom';

const Contact = () => {
  useEffect(() => {
    document.title = 'Contact';
  }, []);

  const mainContentStyle = { minHeight: 'calc(100vh - 60px)' };

  return (
    <div
      style={mainContentStyle}
      className='bg-gray-200 dark:bg-gray-200 px-4 py-12 overflow-auto'
    >
      <ContactForm />

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

export default Contact;
