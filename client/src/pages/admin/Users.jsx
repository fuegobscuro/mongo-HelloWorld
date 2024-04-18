import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  createUser,
  deleteUser,
} from '../../redux/actions';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserModal from '../../components/admin/UserModal';
import LoadingAnimation from '../../components/common/LoadingAnimation';
import MySwal from '../../configs/swalConfig';

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = 'Manage Users';

    dispatch(fetchUsersRequest());
    setLoading(true);
    axios
      .get('/users')
      .then((response) => {
        dispatch(fetchUsersSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.toString()));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // Creation  handler
  const handleModalSubmit = (details) => {
    const url = '/users/register';
    const method = 'post';
    axios({ method, url, data: details })
      .then((response) => {
        dispatch(createUser(response.data));
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error('Error managing user:', error);
      });
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
          .post(`/users/delete?id=${id}`)
          .then(() => {
            dispatch(deleteUser(id));
            MySwal.fire({
              title: 'Deleted!',
              html: `<span class="text-gray-400">The user has been deleted.</span>`,
              icon: 'success',
            });
          })
          .catch((error) => {
            console.error('Error deleting user:', error);
            MySwal.fire({
              title: 'Failed!',
              html: `<span class="text-gray-400">There was a problem deleting the user.</span>`,
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
            Users
          </h2>
          <button
            onClick={openModal}
            className='mb-4 bg-indigo-400 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-700 text-black dark:text-white font-bold py-2 px-4 rounded'
          >
            + Add User
          </button>
        </div>
        <ul className='space-y-3'>
          {users.map((user) => (
            <li
              key={user._id}
              className='flex justify-between items-center bg-white dark:bg-blue-900 rounded-md p-3'
            >
              <span className='font-semibold dark:text-white'>
                {user.username} - {user.level} -{' '}
                {user.isActive ? 'Active' : 'Inactive'}
              </span>
              <div className='flex space-x-2'>
                <button
                  onClick={() => handleDelete(user._id)}
                  className='px-4 py-1 bg-red-400 hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-600 text-black dark:text-white font-bold rounded'
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
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

      <UserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}

export default Users;
