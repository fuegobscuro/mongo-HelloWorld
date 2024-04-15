import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../common/ThemeContext';
import axios from 'axios';
import MySwal from '../../configs/swalConfig';
import { useDispatch } from 'react-redux';
import { removeToken } from '../../redux/actions';
import NavBar from '../common/NavBar';

const AdminNavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isRotated, setIsRotated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [worldEmoji, setWorldEmoji] = useState('🌍');

  const handleToggleTheme = () => {
    toggleTheme();
    setIsRotated(!isRotated); // Toggle the rotation state
  };

  const iconClasses = `px-2 text-lg transition-transform duration-500 transform ${
    isRotated ? 'rotate-180' : ''
  }`;

  useEffect(() => {
    let intervalId;
    if (isHovered) {
      const emojis = ['🌎', '🌍', '🌏'];
      let currentEmojiIndex = 0;
      intervalId = setInterval(() => {
        setWorldEmoji(emojis[currentEmojiIndex]);
        currentEmojiIndex = (currentEmojiIndex + 1) % emojis.length;
      }, 200);
    } else {
      setWorldEmoji('🌎');
    }

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [isHovered]);

  // Function to remove trailing slash
  const normalizePath = (path) =>
    path.endsWith('/') ? path.slice(0, -1) : path;

  // Adjust this list to include all valid admin dashboard paths
  const adminPaths = [
    '/admin-dashboard',
    '/admin-dashboard/programming-languages',
    '/admin-dashboard/contact-messages',
    '/admin-dashboard/analytics',
    '/admin-dashboard/users',
  ];

  // Use the normalizePath function on location.pathname
  const isValidAdminPath = adminPaths.includes(
    normalizePath(location.pathname)
  );

  if (!isValidAdminPath) {
    return <NavBar />;
  }

  const icon = theme === 'dark' ? '☀️' : '🌑';
  const navbarClasses =
    theme === 'dark'
      ? 'bg-blue-900 text-white drop-shadow-xl'
      : 'bg-emerald-400 text-gray-900 drop-shadow-xl';

  const handleLogout = () => {
    MySwal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .get('/auth/logout', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then(() => {
            console.log('Logged out successfully');
            localStorage.removeItem('token');
            dispatch(removeToken());
            navigate('/admin-login');
          })
          .catch((error) => {
            console.error('Logout failed', error);
            MySwal.fire({
              title: 'Failed!',
              html: `<span class="text-gray-400">Logout failed. Please try again.</span>`,
              icon: 'error',
            });
          });
      }
    });
  };

  return (
    <nav className={`${navbarClasses} p-4 flex justify-between items-center`}>
      <Link
        to='/'
        title='Return Home'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className='flex items-center'>
          <div
            className={`text-xl drop-shadow-xl ${
              isHovered ? 'animate-wave' : ''
            }`}
          >
            👋
          </div>
          <div className='text-xl drop-shadow-xl'>{worldEmoji}</div>
          <span className='px-2 font-extrabold text-xl'>
            'Hello, World!' Compendium
          </span>
        </div>
      </Link>

      {isValidAdminPath && (
        <div className='flex items-center gap-6'>
          <Link
            to='/admin-dashboard/programming-languages'
            className='font-bold text-lg text-indigo-900 dark:text-emerald-400 hover:text-indigo-700 dark:hover:text-emerald-300 drop-shadow-sm'
          >
            Programming Languages
          </Link>
          <Link
            to='/admin-dashboard/contact-messages'
            className='font-bold text-lg text-indigo-900 dark:text-emerald-400 hover:text-indigo-700 dark:hover:text-emerald-300 drop-shadow-sm'
          >
            Contact Messages
          </Link>
          <Link
            to='/admin-dashboard/analytics'
            className='font-bold text-lg text-indigo-900 dark:text-emerald-400 hover:text-indigo-700 dark:hover:text-emerald-300 drop-shadow-sm'
          >
            Analytics
          </Link>
          <Link
            to='/admin-dashboard/users'
            className='font-bold text-lg text-indigo-900 dark:text-emerald-400 hover:text-indigo-700 dark:hover:text-emerald-300 drop-shadow-sm'
          >
            Users
          </Link>
        </div>
      )}

      <div className='flex items-center gap-4'>
        <button
          onClick={handleLogout}
          className='bg-red-400 hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-700 text-black dark:text-white font-bold py-0.5 px-4 rounded drop-shadow-sm'
        >
          Logout
        </button>

        <button
          title='Toggle Light/Dark Mode'
          onClick={handleToggleTheme}
          className={iconClasses}
        >
          {icon}
        </button>
      </div>
    </nav>
  );
};

export default AdminNavBar;
