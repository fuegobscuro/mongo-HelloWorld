import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken, removeUserLevel } from '../../redux/actions';
import { useTheme } from '../common/ThemeContext';
import NavBar from '../common/NavBar';
import MySwal from '../../configs/swalConfig';
import LoadingButton from '../../components/common/LoadingButton';

const AdminNavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isRotated, setIsRotated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [worldEmoji, setWorldEmoji] = useState('🌍');
  const [loading, setLoading] = useState(false);
  const userLevel = useSelector((state) => state.userLevel);

  const handleToggleTheme = () => {
    toggleTheme();
    setIsRotated(!isRotated);
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

    return () => clearInterval(intervalId);
  }, [isHovered]);

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
        setLoading(true);
        dispatch(removeToken());
        dispatch(removeUserLevel());
        setLoading(false);
        navigate('/admin-login');
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
          <span
            className='ml-2 font-extrabold text-md'
            style={{ fontFamily: '"Fira Code", monospace' }}
          >
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
          {userLevel === 'super' && (
            <Link
              to='/admin-dashboard/users'
              className='font-bold text-lg text-indigo-900 dark:text-emerald-400 hover:text-indigo-700 dark:hover:text-emerald-300 drop-shadow-sm'
            >
              Users
            </Link>
          )}
        </div>
      )}

      <div className='flex items-center gap-4'>
        {loading ? (
          <LoadingButton />
        ) : (
          <button
            onClick={handleLogout}
            className='bg-red-400 hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-700 text-black dark:text-white font-bold py-0.5 px-4 rounded drop-shadow-sm'
          >
            Logout
          </button>
        )}

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
