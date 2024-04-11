import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import userSchema from '../../validations/userSchema';
import LoadingAnimation from '../common/LoadingAnimation';
import MySwal from '../../configs/swalConfig';

const UserModal = ({
  isOpen,
  onClose,
  onSubmit: propOnSubmit,
  userDetails,
  isEditMode,
}) => {
  const [loading, setLoading] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  useEffect(() => {
    setShowPasswordInput(!isEditMode);
  }, [isOpen, isEditMode]);

  const formik = useFormik({
    initialValues: {
      username: userDetails?.username ?? '',
      password: '',
      isActive: userDetails?.isActive ?? true,
      level: userDetails?.level ?? 'admin',
    },
    enableReinitialize: true,
    validationSchema: userSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setLoading(true);

      // If we're in edit mode and not showing the password input, don't send the password field
      const valuesToSubmit = showPasswordInput
        ? values
        : { ...values, password: undefined };

      try {
        await propOnSubmit(valuesToSubmit, isEditMode);

        MySwal.fire({
          title: 'Success!',
          html: `<span class="text-gray-400">The user was successfully ${
            isEditMode ? 'updated' : 'created'
          }.</span>`,
          icon: 'success',
        });
      } catch (error) {
        MySwal.fire({
          title: 'Failed!',
          html: `<span class="text-gray-400">Failed to ${
            isEditMode ? 'update' : 'create'
          } the user.</span>`,
          icon: 'error',
        });
      } finally {
        setLoading(false);
        setSubmitting(false);
        onClose();
        resetForm();
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center shadow-2xl drop-shadow-xl'>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <div className='relative p-8 bg-green-100 dark:bg-gray-800 shadow-md drop-shadow-md rounded-lg w-full max-w-3xl dark:shadow-black'>
          <button
            onClick={() => {
              formik.resetForm();
              onClose();
              setShowPasswordInput(false); // Ensure this is reset when closing the modal
            }}
            className='absolute top-0 right-0 mt-3 mr-3 border border-transparent bg-emerald-400 drop-shadow-sm shadow-sm text-sm hover:bg-emerald-300 text-black font-bold rounded-lg dark:bg-blue-800 dark:text-white dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 items-center p-1 ml-auto inline-flex'
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
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>

          <form onSubmit={formik.handleSubmit} className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label
                  htmlFor='username'
                  className='block text-sm font-medium text-gray-800 dark:text-gray-300'
                >
                  <b>Username:</b>
                </label>
                <input
                  type='text'
                  name='username'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  className='mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm drop-shadow-sm border-2 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
                  required
                />

                {formik.touched.password && formik.errors.username && (
                  <p className='text-red-500 text-xs italic'>
                    {formik.errors.username}
                  </p>
                )}
              </div>

              {(showPasswordInput || !isEditMode) && (
                <div>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium text-gray-800 dark:text-gray-300'
                  >
                    <b>Password:</b>
                  </label>
                  <input
                    type='text'
                    name='password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className='mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm drop-shadow-sm border-2 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
                    required={!isEditMode || showPasswordInput}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className='text-red-500 text-xs italic'>
                      {formik.errors.password}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className='flex justify-between items-center'>
              <div className='flex items-center'>
                <label
                  htmlFor='level'
                  className='text-sm font-medium text-gray-800 dark:text-gray-300'
                >
                  <b>Admin Level:</b>
                </label>
                <select
                  name='level'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.level}
                  className='pl-3 py-1 ml-2 block text-center justify-center text-gray-800 dark:text-gray-300 rounded-md border-gray-300 shadow-sm drop-shadow-sm pr-5 bg-white dark:bg-gray-700 text-xs'
                >
                  <option
                    value='admin'
                    className='text-center rounded-md shadow-sm pr-7 text-xs'
                  >
                    Admin
                  </option>
                  <option
                    value='super'
                    className='text-center rounded-md shadow-sm pr-7 text-xs'
                  >
                    Super Admin
                  </option>
                </select>
              </div>

              <div className='mr-5 flex items-center'>
                <label
                  htmlFor='isActive'
                  className=' text-sm font-medium text-gray-800 dark:text-gray-300'
                >
                  <b>Is Active:</b>
                </label>
                <input
                  type='checkbox'
                  name='isActive'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.isActive}
                  className='ml-2 block rounded-md border-gray-300 shadow-sm drop-shadow-sm'
                />
              </div>
              {isEditMode && (
                <div className='flex items-center justify-end'>
                  <label
                    htmlFor='changePassword'
                    className='mr-2 text-sm font-medium text-gray-800 dark:text-gray-300'
                  >
                    <b>Change Password:</b>
                  </label>
                  <input
                    type='checkbox'
                    id='changePassword'
                    checked={showPasswordInput}
                    onChange={() => setShowPasswordInput(!showPasswordInput)}
                  />
                </div>
              )}
              <button
                type='submit'
                className='inline-flex justify-center py-2 px-4 border border-transparent bg-emerald-400 drop-shadow-sm hover:bg-emerald-300 text-black font-bold rounded dark:bg-blue-800 dark:text-white dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm  text-sm'
              >
                {isEditMode ? 'Update' : 'Add'} Admin
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserModal;
