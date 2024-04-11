import React, { useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import programmingLanguageSchema from '../../validations/programmingLanguageSchema';
import LoadingAnimation from '../common/LoadingAnimation';
import MySwal from '../../configs/swalConfig';

const LanguageModal = ({
  isOpen,
  onClose,
  onSubmit: propOnSubmit,
  languageDetails,
  isEditMode,
}) => {
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      year: '',
      creator: '',
      description: '',
      helloWorldCode: '',
      tiobeRank: '',
      codeLang: '',
      codeDevicon: '',
      codeSimpleIcons: '',
      isActive: true,
    },
    validationSchema: programmingLanguageSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const action = isEditMode ? 'update' : 'create';
      const confirmText = isEditMode
        ? 'Update the language?'
        : 'Create a new language?';
      const result = await MySwal.fire({
        title: 'Are you sure?',
        html: `<span class="text-gray-400">${confirmText}</span>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, ${action} it!`,
      });

      if (result.isConfirmed) {
        setLoading(true);
        try {
          await propOnSubmit(values, isEditMode);
          MySwal.fire({
            title: 'Success!',
            html: `<span class="text-gray-400">The language was successfully ${action}d.</span>`,
            icon: 'success',
          });
        } catch (error) {
          MySwal.fire({
            title: 'Failed!',
            html: `<span class="text-gray-400">Failed to ${action} the language.</span>`,
            icon: 'error',
          });
        } finally {
          setLoading(false);
          setSubmitting(false);
          onClose();
        }
      } else {
        setSubmitting(false);
      }
    },
  });

  const { setValues } = formik;

  const updateFormValues = useCallback(() => {
    if (isOpen) {
      if (languageDetails) {
        setValues(languageDetails);
      } else {
        setValues(formik.initialValues);
      }
    }
  }, [isOpen, languageDetails, setValues, formik.initialValues]);

  useEffect(() => {
    updateFormValues();
  }, [updateFormValues]);

  if (!isOpen) return null;

  if (loading) return <LoadingAnimation />;

  return (
    <div className='fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center shadow-2xl drop-shadow-xl'>
      <div className='relative p-8 bg-green-100 dark:bg-gray-800 shadow-md drop-shadow-md rounded-lg w-full max-w-3xl'>
        <button
          onClick={() => {
            formik.resetForm();
            onClose();
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
          <div className='grid grid-cols-3 gap-4'>
            <div className='col-span-2'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-800 dark:text-gray-300'
              >
                <b>Name:</b>
              </label>
              <input
                type='text'
                name='name'
                {...formik.getFieldProps('name')}
                className='mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm drop-shadow-sm border-2 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
                required
              />
              {formik.touched.name && formik.errors.name && (
                <p className='text-red-500 text-xs italic'>
                  {formik.errors.name}
                </p>
              )}
            </div>

            <div className='col-span-1'>
              <label
                htmlFor='year'
                className='block text-sm font-medium text-gray-800 dark:text-gray-300'
              >
                <b>Year:</b>
              </label>
              <input
                type='number'
                name='year'
                {...formik.getFieldProps('year')}
                className='mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm drop-shadow-sm border-2 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
                required
              />
              {formik.touched.year && formik.errors.year && (
                <p className='text-red-500 text-xs italic'>
                  {formik.errors.year}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor='creator'
              className='block text-sm font-medium text-gray-800 dark:text-gray-300'
            >
              <b>Creator:</b>
            </label>
            <input
              type='text'
              name='creator'
              {...formik.getFieldProps('creator')}
              className='mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm drop-shadow-sm border-2 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
              required
            />
            {formik.touched.creator && formik.errors.creator && (
              <p className='text-red-500 text-xs italic'>
                {formik.errors.creator}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-800 dark:text-gray-300'
            >
              <b>Description:</b>
            </label>
            <textarea
              name='description'
              {...formik.getFieldProps('description')}
              className='mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm drop-shadow-md border-2 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
              required
            ></textarea>
            {formik.touched.description && formik.errors.description && (
              <p className='text-red-500 text-xs italic'>
                {formik.errors.description}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='helloWorldCode'
              className='block text-sm font-medium text-gray-800 dark:text-gray-300'
            >
              <b>'Hello, World!' Code:</b>
            </label>
            <textarea
              name='helloWorldCode'
              {...formik.getFieldProps('helloWorldCode')}
              className='mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm drop-shadow-sm border-2 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
            ></textarea>
            {formik.touched.helloWorldCode && formik.errors.helloWorldCode && (
              <p className='text-red-500 text-xs italic'>
                {formik.errors.helloWorldCode}
              </p>
            )}
          </div>

          <div className='grid grid-cols-3 gap-4'>
            <div>
              <label
                htmlFor='tiobeRank'
                className='block text-sm font-medium text-gray-800 dark:text-gray-300'
              >
                <b>TIOBE Rank:</b>
              </label>
              <input
                type='number'
                name='tiobeRank'
                {...formik.getFieldProps('tiobeRank')}
                className='mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm drop-shadow-sm border-2  dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
              />
              {formik.touched.tiobeRank && formik.errors.tiobeRank && (
                <p className='text-red-500 text-xs italic'>
                  {formik.errors.tiobeRank}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='codeLang'
                className='block text-sm font-medium text-gray-800 dark:text-gray-300'
              >
                <b>Code Language:</b>
              </label>
              <input
                type='text'
                name='codeLang'
                {...formik.getFieldProps('codeLang')}
                className='mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm drop-shadow-sm border-2  dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
              />
            </div>

            <div>
              <div className='flex justify-between'>
                <label
                  htmlFor='codeDevicon'
                  className='block text-sm font-medium text-gray-800 dark:text-gray-300'
                >
                  <b>Devicon Code:</b>
                </label>
                <i className='text-xs font-medium text-gray-800 dark:text-gray-300 mt-1'>
                  (blank if it doesn't exist)
                </i>
              </div>
              <input
                type='text'
                name='codeDevicon'
                {...formik.getFieldProps('codeDevicon')}
                className='mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm drop-shadow-sm border-2  dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
              />
            </div>
          </div>
          <div>
            <label
              htmlFor='codeSimpleIcons'
              className='block text-sm font-medium text-gray-800 dark:text-gray-300'
            >
              <b>Simple Icons code OR icon URL:</b>
            </label>
            <input
              type='text'
              name='codeSimpleIcons'
              {...formik.getFieldProps('codeSimpleIcons')}
              className='mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm drop-shadow-sm border-2  dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white'
            />
          </div>
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <label
                htmlFor='isActive'
                className='text-sm font-medium text-gray-800 dark:text-gray-300'
              >
                <b>Is Active:</b>
              </label>
              <input
                type='checkbox'
                name='isActive'
                checked={formik.values.isActive}
                onChange={formik.handleChange}
                className='ml-2 block rounded-md border-gray-300 shadow-sm drop-shadow-sm'
              />
            </div>

            <button
              type='submit'
              className='inline-flex justify-center py-2 px-4 border border-transparent bg-emerald-400 drop-shadow-sm hover:bg-emerald-300 text-black font-bold rounded dark:bg-blue-800 dark:text-white dark:hover:bg-blue-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              {isEditMode ? 'Update' : 'Add'} Programming Language
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LanguageModal;
