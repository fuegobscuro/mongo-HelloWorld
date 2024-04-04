import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  validateEmail,
  validateName,
  validateMessage,
} from '../utils/validations/formValidations';

// Define MySwal with global configuration
const MySwal = withReactContent(
  Swal.mixin({
    customClass: {
      container: 'max-w-xl mx-auto',
      popup: 'bg-white dark:bg-gray-800 rounded-lg shadow-2xl',
      title: 'text-gray-800 dark:text-white text-lg font-bold',
      content: 'text-gray-600 dark:text-gray-200 text-sm shadow-2xl',
      confirmButton:
        'bg-gray-300 hover:bg-yellow-200 text-black font-bold py-2 px-4 mr-1 rounded dark:invert',
      cancelButton:
        'bg-gray-300 hover:bg-red-300 text-black font-bold py-2 px-4 ml-1 rounded dark:invert dark:hover:bg-green-300',
    },
    buttonsStyling: false,
    backdrop: false,
  })
);

const ContactForm = () => {
  const [contact, setContact] = useState({
    name: '',
    mail: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!validateName(contact.name)) {
      newErrors.name = 'Please enter a valid name (1-50 characters).';
    }

    if (!validateEmail(contact.mail)) {
      newErrors.mail = 'Please enter a valid email.';
    }

    if (!validateMessage(contact.message)) {
      newErrors.message = 'Please enter a message (1-500 characters).';
    }

    // If there are any errors, update state and abort submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Confirmation dialog
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, send it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Form submission
        axios
          .post('/contact', contact)
          .then(() => {
            MySwal.fire('Sent!', 'Your message has been sent.', 'success');
            navigate('/');
          })
          .catch((error) => {
            console.error('Submission error:', error);
            MySwal.fire(
              'Error!',
              'There was an issue sending your message.',
              'error'
            );
          });
      }
    });
  };

  return (
    <div className='max-w-xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-6'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Name input */}
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
            <b>Name:</b>
          </label>
          <input
            type='text'
            name='name'
            value={contact.name}
            onChange={handleChange}
            className={`h-8 mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-lg focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
              errors.name ? 'border-red-500' : ''
            }`}
          />
          {errors.name && (
            <p className='text-red-500 text-xs italic'>{errors.name}</p>
          )}
        </div>

        {/* Email input */}
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
            <b>Email:</b>
          </label>
          <input
            type='email'
            name='mail'
            value={contact.mail}
            onChange={handleChange}
            className={`h-8 mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-lg focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
              errors.mail ? 'border-red-500' : ''
            }`}
          />
          {errors.mail && (
            <p className='text-red-500 text-xs italic'>{errors.mail}</p>
          )}
        </div>

        {/* Message input */}
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
            <b>Message:</b>
          </label>
          <textarea
            name='message'
            value={contact.message}
            onChange={handleChange}
            className={`mt-1 pl-2 h-44 resize-none block w-full rounded-md border-gray-300 shadow-lg focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
              errors.message ? 'border-red-500' : ''
            }`}
          ></textarea>
          {errors.message && (
            <p className='text-red-500 text-xs italic'>{errors.message}</p>
          )}
        </div>

        {/* Submit button */}
        <div className='w-full flex justify-end pt-2'>
          <button
            type='submit'
            className='bg-gray-300 hover:bg-yellow-200 text-black font-bold py-2 px-4 rounded dark:invert'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
