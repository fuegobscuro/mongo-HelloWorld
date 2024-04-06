import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import contactSchema from '../validations/contactSchema';
import MySwal from '../configs/swalConfig';

const ContactForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      mail: '',
      message: '',
    },
    validationSchema: contactSchema,
    onSubmit: async (values) => {
      MySwal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, send it!',
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post('/contact', values)
            .then(() => {
              MySwal.fire({
                title: 'Sent!',
                html: '<span class="text-gray-300">Your message has been sent.</span>',
                icon: 'success',
              }).then(() => {
                navigate('/');
              });
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
    },
  });

  return (
    <div className='max-w-xl mx-auto bg-white dark:bg-gray-800 shadow-2xl dark:shadow-black rounded-lg p-6'>
      <form onSubmit={formik.handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
            <b>Name:</b>
          </label>
          <input
            type='text'
            name='name'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className='h-8 mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
          />
          {formik.touched.name && formik.errors.name && (
            <p className='text-red-500 text-xs italic'>{formik.errors.name}</p>
          )}
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
            <b>Email:</b>
          </label>
          <input
            type='email'
            name='mail'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.mail}
            className='h-8 mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
          />
          {formik.touched.mail && formik.errors.mail && (
            <p className='text-red-500 text-xs italic'>{formik.errors.mail}</p>
          )}
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
            <b>Message:</b>
          </label>
          <textarea
            name='message'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            className='mt-1 pl-2 h-44 resize-none block w-full rounded-md border-gray-300 shadow-sm border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
          ></textarea>
          {formik.touched.message && formik.errors.message && (
            <p className='text-red-500 text-xs italic'>
              {formik.errors.message}
            </p>
          )}
        </div>

        <div className='w-full flex justify-end pt-2'>
          <button
            type='submit'
            className='bg-gray-300 drop-shadow-sm hover:bg-yellow-200 text-black font-bold py-2 px-4 rounded dark:invert'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
