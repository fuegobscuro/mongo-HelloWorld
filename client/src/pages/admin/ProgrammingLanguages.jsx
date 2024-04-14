import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LanguageModal from '../../components/admin/LanguageModal';
import MySwal from '../../configs/swalConfig';

function ProgrammingLanguages() {
  const [languages, setLanguages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const [languageDetails, setLanguageDetails] = useState({
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
  });

  useEffect(() => {
    document.title = 'Manage Programming Languages';
    fetchLanguages();
  }, []);

  const fetchLanguages = () => {
    axios
      .get('/programming-languages?includeInactive=true')
      .then((response) => setLanguages(response.data))
      .catch((error) =>
        console.error('Error fetching programming languages:', error)
      );
  };

  const openModalForAdd = () => {
    setLanguageDetails(null);
    setIsModalOpen(true);
    setEditMode(false);
    setCurrentLanguage(null);
  };

  const openModalForEdit = (language) => {
    setEditMode(true);
    setCurrentLanguage(language._id);
    setLanguageDetails({ ...language });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleModalSubmit = (details) => {
    const url = editMode
      ? `/programming-languages/update/${currentLanguage}`
      : '/programming-languages/create';
    const method = editMode ? 'put' : 'post';

    axios({
      method: method,
      url: url,
      data: details,
    })
      .then((response) => {
        fetchLanguages(); // Refetch the list to reflect changes
        setIsModalOpen(false);
      })
      .catch((error) => console.error('Error submitting language:', error));
  };

  const handleDeactivateActivate = (language) => {
    const url = language.isActive
      ? `/programming-languages/deactivate/${language._id}`
      : `/programming-languages/reactivate/${language._id}`;

    axios
      .patch(url)
      .then(() => {
        setLanguages((currentLanguages) =>
          currentLanguages.map((lang) =>
            lang._id === language._id
              ? { ...lang, isActive: !lang.isActive }
              : lang
          )
        );
      })
      .catch((error) =>
        console.error(`Error updating language status:`, error)
      );
  };

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
          .delete(`/programming-languages/delete/${id}`)
          .then(() => {
            setLanguages(languages.filter((language) => language._id !== id));
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

  const mainContentStyle = { minHeight: 'calc(100vh - 72px)' };

  return (
    <div
      style={mainContentStyle}
      className='bg-gray-200 dark:bg-gray-200 flex flex-col justify-center items-center overflow-auto px-4 py-6'
    >
      {/* <h1 className='text-3xl font-bold dark:text-white mb-6'>
        Admin Dashboard
      </h1> */}

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
