import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchContactMessagesRequest,
  fetchContactMessagesSuccess,
  fetchContactMessagesFailure,
  deleteContactMessage,
} from '../../redux/actions';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ContactMessagesModal from '../../components/admin/ContactMessagesModal';
import LoadingAnimation from '../../components/common/LoadingAnimation';
import MySwal from '../../configs/swalConfig';

const ContactMessages = () => {
  const dispatch = useDispatch();
  const reduxToken = useSelector((state) => state.token);
  const localStorageToken = localStorage.getItem('token');
  const token = localStorageToken || reduxToken;
  const contactMessages = useSelector((state) => state.contactMessages);
  const userLevel = useSelector((state) => state.userLevel);

  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContactMessage, setCurrentContactMessage] = useState(null);

  useEffect(() => {
    document.title = 'Admin: Contact Messages';

    dispatch(fetchContactMessagesRequest());
    setLoading(true);
    axios
      .get('/contact-messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(fetchContactMessagesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchContactMessagesFailure(error.toString()));
        MySwal.fire({
          title: 'Failed!',
          html: `<span class="text-gray-400">${error.response.data.message}</span>`,
          icon: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const openModal = (messageId) => {
    // Find the message object using the messageId
    const message = contactMessages.find((m) => m._id === messageId);
    setCurrentContactMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContactMessage(null);
  };

  // Delete handler
  const handleDelete = (id) => {
    MySwal.fire({
      title: 'Are you sure?',
      html: `<span class="text-gray-400">You won't be able to revert this!</span>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete the message!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.value) {
        axios
          .post(
            `/contact-messages/delete?id=${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            dispatch(deleteContactMessage(id));
            MySwal.fire({
              title: 'Deleted!',
              html: `<span class="text-gray-400">The message has been deleted.</span>`,
              icon: 'success',
            });
          })
          .catch((error) => {
            console.error('Error deleting message:', error);
            MySwal.fire({
              title: 'Failed!',
              html: `<span class="text-gray-400">${error.response.data.message}</span>`,
              icon: 'error',
            });
          });
      }
    });
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  const mainContentStyle = { minHeight: 'calc(100vh - 60px)' };

  return (
    <div
      style={mainContentStyle}
      className='bg-gray-200 dark:bg-gray-200 flex flex-col justify-top items-center overflow-auto px-4 py-6'
    >
      <div className='w-full max-w-4xl bg-green-100 dark:bg-gray-800 shadow-2xl dark:shadow-lg rounded-lg p-4 '>
        <div className='flex justify-between'>
          <h2 className='text-2xl px-1 font-bold text-indigo-800 drop-shadow-xl dark:text-emerald-400 mb-4 flex justify-start'>
            Contact Messages
          </h2>
        </div>

        <ul className='space-y-3'>
          {contactMessages.map((message) => (
            <li
              key={message._id}
              className='flex justify-between items-center bg-white dark:bg-blue-900 rounded-md p-3'
            >
              <span className='font-semibold dark:text-white'>
                {message.name} - {message.mail} -{' '}
                {new Date(message.createdAt).toLocaleString()}
              </span>

              <div className='flex space-x-2'>
                <button
                  onClick={() => openModal(message._id)}
                  className='px-4 py-1 bg-indigo-400 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-700 text-black dark:text-white font-bold rounded'
                >
                  View
                </button>
                {userLevel === 'super' && (
                  <button
                    onClick={() => handleDelete(message._id)}
                    className='px-4 py-1 bg-red-400 hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-600 text-black dark:text-white font-bold rounded'
                  >
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {isModalOpen && (
        <ContactMessagesModal
          isOpen={isModalOpen}
          data={currentContactMessage}
          onClose={closeModal}
          onDelete={() => handleDelete(currentContactMessage._id)}
        />
      )}
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
  );
};

export default ContactMessages;
