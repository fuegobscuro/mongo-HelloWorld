import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import contactSchema from '../../validations/contactSchema';
import MySwal from '../../configs/swalConfig';
import LoadingAnimation from '../common/LoadingAnimation';

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      mail: '',
      message: '',
    },
    validationSchema: contactSchema,
    onSubmit: async (values, { setSubmitting }) => {
      MySwal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, send it!',
      }).then((result) => {
        if (result.isConfirmed) {
          setLoading(true);
          axios
            .post('/api/contact-message/create', values)
            .then(() => {
              MySwal.fire({
                title: 'Sent!',
                html: '<span class="text-gray-400">Your message has been sent.</span>',
                icon: 'success',
              }).then(() => {
                navigate('/');
              });
            })
            .catch((error) => {
              console.error('Submission error:', error);
              MySwal.fire({
                title: 'Error!',
                html: '<span class="text-gray-400">There was an issue sending your message</span>',
                icon: 'error',
              });
            })
            .finally(() => {
              setLoading(false); // Stop loading
              setSubmitting(false); // Stop formik submitting
            });
        }
      });
    },
  });

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div className='max-w-xl mx-auto bg-green-100 dark:bg-gray-800 shadow-md drop-shadow-md rounded-lg p-6'>
      <form onSubmit={formik.handleSubmit} className='space-y-4'>
        <div>
          <div>
            <label className='block text-sm font-medium text-gray-800 dark:text-white'>
              <b>Name:</b>
            </label>
            <input
              type='text'
              name='name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className='h-8 mt-1 mb-2 pl-2 block w-full rounded-md border-gray-300 shadow-sm border-2 focus:border-blue-500 focus:ring-blue-500d dark:border-gray-700 dark:bg-gray-700 dark:text-white'
            />
            {formik.touched.name && formik.errors.name && (
              <p className='text-red-500 text-xs italic'>
                {formik.errors.name}
              </p>
            )}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-800 dark:text-white'>
              <b>Email:</b>
            </label>
            <input
              type='email'
              name='mail'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mail}
              className='h-8 mt-1 mb-2 pl-2 block w-full rounded-md shadow-sm border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-700 dark:text-white'
            />
            {formik.touched.mail && formik.errors.mail && (
              <p className='text-red-500 text-xs italic'>
                {formik.errors.mail}
              </p>
            )}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-800 dark:text-white'>
              <b>Message:</b>
            </label>
            <textarea
              name='message'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              className='mt-1 pl-2 h-44 resize-none block w-full rounded-md border-gray-300 shadow-sm border-2 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
            ></textarea>
            {formik.touched.message && formik.errors.message && (
              <p className='text-red-500 text-xs italic'>
                {formik.errors.message}
              </p>
            )}
          </div>
        </div>

        <div className='w-full flex justify-center pt-1'>
          <button
            type='submit'
            className='bg-emerald-400 drop-shadow-sm hover:bg-emerald-300 text-black font-bold py-2 px-4 rounded dark:bg-blue-800 dark:text-white dark:hover:bg-blue-700'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
