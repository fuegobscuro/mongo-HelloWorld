import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUnauthenticated } from '../redux/actions';

function AdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    document.title = 'Admin Dashboard';
  }, []);

  useEffect(() => {
    axios
      .get('/programming-languages')
      .then((response) => setLanguages(response.data))
      .catch((error) =>
        console.error('Error fetching programming languages:', error)
      );
  }, []);

  const handleLogout = () => {
    axios
      .get('/logout')
      .then(() => {
        console.log('Logged out successfully');
        dispatch(setUnauthenticated()); // Dispatch action to update state
        navigate('/admin');
      })
      .catch((error) => console.error('Logout failed', error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`/delete-language/${id}`)
      .then(() => {
        setLanguages(languages.filter((language) => language._id !== id));
      })
      .catch((error) => console.error('Error deleting language:', error));
  };

  const [newLanguageDetails, setNewLanguageDetails] = useState({
    name: '',
    year: '',
    creator: '',
    description: '',
  });

  const handleSubmitNewLanguage = (e) => {
    e.preventDefault();
    axios
      .post('/create-language', newLanguageDetails)
      .then(() => {})
      .catch((error) => console.error('Error creating new language:', error));
  };

  const handleUpdate = (id) => {
    console.log(`Update language with ID: ${id}`);
    // Implement navigation to update page or open modal for editing
  };

  const handleDeactivateActivate = (language) => {
    const action = language.isActive ? 'deactivate' : 'reactivate';
    axios
      .patch(`/${action}-language/${language._id}`)
      .then(() => {
        console.log(`Language ${action}d successfully`);
        setLanguages(
          languages.map((lang) =>
            lang._id === language._id
              ? { ...lang, isActive: !lang.isActive }
              : lang
          )
        );
      })
      .catch((error) => console.error(`Error ${action}ing language:`, error));
  };

  const mainContentStyle = { minHeight: 'calc(100vh - 60px)' };

  return (
    <div
      style={mainContentStyle}
      className='bg-gray-100 dark:bg-gray-800 flex flex-col justify-center items-center overflow-auto px-4 py-6'
    >
      <h1 className='text-3xl font-bold dark:text-white mb-6'>
        Admin Dashboard
      </h1>

      <button
        onClick={handleLogout}
        className='mb-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200'
      >
        Logout
      </button>

      <div className='w-full max-w-4xl bg-white dark:bg-gray-800 shadow-2xl dark:shadow-lg rounded-lg p-4'>
        <h2 className='text-xl font-bold dark:text-white mb-4'>
          Programming Languages
        </h2>
        <ul className='space-y-3'>
          {languages.map((language) => (
            <li
              key={language._id}
              className='flex justify-between items-center bg-gray-200 dark:bg-gray-700 rounded-md p-3'
            >
              <span className='font-medium dark:text-white'>
                {language.name}
              </span>
              <div className='flex space-x-2'>
                <button
                  onClick={() => handleUpdate(language._id)}
                  className='px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded transition-colors duration-200'
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeactivateActivate(language)}
                  className='px-4 py-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded transition-colors duration-200'
                >
                  Deactivate/Activate
                </button>
                <button
                  onClick={() => handleDelete(language._id)}
                  className='px-4 py-1 bg-red-500 hover:bg-red-600 text-white font-bold rounded transition-colors duration-200'
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='absolute bottom-10 right-20'>
        <Link
          to='/'
          className='bg-gray-300 hover:bg-yellow-200 text-black font-bold py-2 px-4 rounded transition-colors duration-200 dark:invert'
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
