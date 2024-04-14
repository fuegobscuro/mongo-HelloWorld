import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserModal from '../../components/admin/UserModal';
import MySwal from '../../configs/swalConfig';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    document.title = 'Manage Users';
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get('/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  };

  const openModalForAdd = () => {
    setCurrentUser(null);
    setIsModalOpen(true);
    setEditMode(false);
  };

  const openModalForEdit = (user) => {
    setEditMode(true);
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleModalSubmit = (userDetails) => {
    const url = editMode ? `/user/update/${currentUser._id}` : '/user/register';
    const method = editMode ? 'patch' : 'post';

    axios({ method, url, data: userDetails })
      .then(() => {
        fetchUsers(); // Refetch the list to reflect changes
        setIsModalOpen(false);
      })
      .catch((error) => console.error('Error managing user:', error));
  };

  const handleDeactivateActivate = (user) => {
    const url = user.isActive
      ? `/user/deactivate/${user._id}`
      : `/user/reactivate/${user._id}`;

    axios
      .patch(url)
      .then(() => {
        setUsers((currentUsers) =>
          currentUsers.map((currentUser) =>
            currentUser._id === user._id
              ? { ...currentUser, isActive: !currentUser.isActive }
              : currentUser
          )
        );
      })
      .catch((error) => console.error(`Error updating user status:`, error));
  };

  const handleDelete = (id) => {
    MySwal.fire({
      title: 'Are you sure?',
      html: `<span class="text-gray-400">You won't be able to revert this!</span>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete the user!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/user/delete/${id}`)
          .then(() => {
            setUsers(users.filter((user) => user._id !== id)); // Corrected to `setUsers` and `users`
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

  const mainContentStyle = { minHeight: 'calc(100vh - 72px)' };

  return (
    <div
      style={mainContentStyle}
      className='bg-gray-200 dark:bg-gray-200 flex flex-col justify-center items-center overflow-auto px-4 py-6'
    >
      <div className='w-full max-w-4xl bg-green-100 dark:bg-gray-800 shadow-2xl dark:shadow-lg rounded-lg p-4'>
        <div className='flex justify-between'>
          <h2 className='text-2xl px-1 font-bold text-indigo-800 drop-shadow-xl dark:text-emerald-400 mb-4 flex justify-start'>
            Users
          </h2>
          <button
            onClick={openModalForAdd}
            className='mb-4 bg-indigo-400 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-700 text-black dark:text-white font-bold py-2 px-4 rounded'
          >
            + Add User
          </button>
        </div>
        <ul className='space-y-3'>
          {users.map((user) => (
            <li
              key={user.id}
              className='flex justify-between items-center bg-white dark:bg-blue-900 rounded-md p-3'
            >
              <span className='font-semibold dark:text-white'>
                {user.username} - {user.level} -{' '}
                {user.isActive ? 'Active' : 'Inactive'}
              </span>
              <div className='flex space-x-2'>
                <button
                  onClick={() => openModalForEdit(user)}
                  className='px-4 py-1 bg-blue-400 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 text-black dark:text-white font-bold rounded'
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeactivateActivate(user)}
                  style={{ minWidth: '110px' }}
                  className={`px-4 py-1 text-black dark:text-white font-bold rounded ${
                    user.isActive
                      ? 'bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600'
                      : 'bg-green-400 hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-600'
                  }`}
                >
                  {user.isActive ? 'Deactivate' : ' Activate '}
                </button>
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
        userDetails={currentUser}
        isEditMode={editMode}
      />
    </div>
  );
}

export default UserManagement;
