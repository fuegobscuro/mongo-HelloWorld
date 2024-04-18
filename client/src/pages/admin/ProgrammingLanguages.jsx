import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchLanguagesRequest,
  fetchLanguagesSuccess,
  fetchLanguagesFailure,
  createLanguage,
  updateLanguage,
  updateLanguageStatus,
  deleteLanguage,
} from '../../redux/actions';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LanguageModal from '../../components/admin/LanguageModal';
import LoadingAnimation from '../../components/common/LoadingAnimation';
import MySwal from '../../configs/swalConfig';

function ProgrammingLanguages() {
  const dispatch = useDispatch();
  const languages = useSelector((state) => state.languages);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const initialLanguageDetails = {
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
  };
  const [languageDetails, setLanguageDetails] = useState(
    initialLanguageDetails
  );

  useEffect(() => {
    document.title = 'Manage Programming Languages';

    dispatch(fetchLanguagesRequest());
    setLoading(true);
    axios
      .get('/programming-languages?includeInactive=true')
      .then((response) => {
        dispatch(fetchLanguagesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchLanguagesFailure(error.toString()));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const openModalForAdd = () => {
    setIsModalOpen(true);
    setEditMode(false);
    setCurrentLanguage(null);
    setLanguageDetails({ ...initialLanguageDetails });
  };

  const openModalForEdit = (language) => {
    setIsModalOpen(true);
    setEditMode(true);
    setCurrentLanguage(language._id);
    setLanguageDetails({ ...language });
  };

  const closeModal = () => setIsModalOpen(false);

  // Creation and Update handler
  const handleModalSubmit = (details) => {
    const url = editMode
      ? `/programming-languages/update?id=${currentLanguage}`
      : '/programming-languages/create';
    const method = editMode ? 'put' : 'post';
    axios({ method, url, data: details })
      .then(() => {
        if (editMode) {
          dispatch(updateLanguage(currentLanguage, details));
        } else {
          dispatch(createLanguage(details));
        }
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error('Error submitting language:', error);
      });
  };

  // Activation/Deactivation handler
  const handleDeactivateActivate = (language) => {
    const updatedDetails = { isActive: !language.isActive };
    const url = `/programming-languages/update?id=${language._id}`;
    axios
      .put(url, updatedDetails)
      .then(() => {
        dispatch(updateLanguageStatus(language._id, !language.isActive));
      })
      .catch((error) =>
        console.error(`Error updating language status:`, error)
      );
  };

  // Delete handler
  const handleDelete = (id) => {
    MySwal.fire({
      title: 'Are you sure?',
      html: `<span class="text-gray-400">You won't be able to revert this!</span>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`/programming-languages/delete?id=${id}`)
          .then(() => {
            dispatch(deleteLanguage(id));
            MySwal.fire({
              title: 'Deleted!',
              html: `<span class="text-gray-400">The language has been deleted.</span>`,
              icon: 'success',
            });
          })
          .catch((error) => {
            console.error('Error deleting language:', error);
            MySwal.fire({
              title: 'Failed!',
              html: `<span class="text-gray-400">There was a problem deleting the language.</span>`,
              icon: 'error',
            });
          });
      }
    });
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  const mainContentStyle = { minHeight: 'calc(100vh - 72px)' };

  return (
    <div
      style={mainContentStyle}
      className='bg-gray-200 dark:bg-gray-200 flex flex-col justify-top items-center overflow-auto px-4 py-6'
    >
      <div className='w-full max-w-4xl bg-green-100 dark:bg-gray-800 shadow-2xl dark:shadow-lg rounded-lg p-4'>
        {' '}
        <div className='flex justify-between'>
          <h2 className='text-2xl px-1 font-bold text-indigo-800 drop-shadow-xl dark:text-emerald-400 mb-4 flex justify-start'>
            Programming Languages
          </h2>
          <button
            onClick={openModalForAdd}
            className='mb-4 bg-indigo-400 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-700 text-black dark:text-white font-bold py-2 px-4 rounded'
          >
            + Add Programming Language
          </button>
        </div>
        <ul className='space-y-3'>
          {languages.map((language) => (
            <li
              key={language._id}
              className='flex justify-between items-center bg-white dark:bg-blue-900 rounded-md p-3'
            >
              <span className='font-semibold dark:text-white'>
                {language.name}
              </span>
              <div className='flex space-x-2'>
                <button
                  onClick={() => openModalForEdit(language)}
                  className='px-4 py-1 bg-blue-400 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 text-black dark:text-white font-bold rounded'
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeactivateActivate(language)}
                  style={{ minWidth: '110px' }}
                  className={`px-4 py-1 text-black dark:text-white font-bold rounded  ${
                    language.isActive
                      ? 'bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600'
                      : 'bg-green-400 hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-600'
                  }`}
                >
                  {language.isActive ? 'Deactivate' : ' Activate '}
                </button>
                <button
                  onClick={() => handleDelete(language._id)}
                  className='px-4 py-1 bg-red-400 hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-600 text-black dark:text-white font-bold rounded'
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className=''>
        <div className='fixed bottom-24 right-20'>
          <Link
            to='/admin-dashboard'
            className='bg-emerald-400 hover:bg-emerald-300 drop-shadow-sm text-black font-bold py-2 px-4 rounded dark:bg-blue-800 dark:text-white dark:hover:bg-blue-700'
          >
            Admin Dashboard
          </Link>
        </div>

        <div className='fixed bottom-12 right-20'>
          <Link
            to='/'
            className='bg-emerald-400 hover:bg-emerald-300 drop-shadow-sm text-black font-bold py-2 px-4 rounded dark:bg-blue-800 dark:text-white dark:hover:bg-blue-700'
          >
            Return Home
          </Link>
        </div>
      </div>
      <LanguageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
        languageDetails={languageDetails}
        isEditMode={editMode}
      />
    </div>
  );
}

export default ProgrammingLanguages;
