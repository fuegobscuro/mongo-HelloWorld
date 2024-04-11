import React, { useState, useEffect } from 'react';
import { useTheme } from '../common/ThemeContext';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();
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

  // Function to remove trailing slash, unless it's the root path "/"
  const normalizePath = (path) =>
    path === '/' ? path : path.replace(/\/+$/, '');

  // Normalizing the current location pathname
  const currentPath = normalizePath(location.pathname);

  const knownPaths = [
    '/',
    '/contact',
    '/about',
    '/admin-login',
    '/admin-dashboard',
  ];

  // Checking against the normalized current path
  const isUnknownPath = !knownPaths.includes(currentPath);

  const icon = theme === 'dark' ? '☀️' : '🌑';
  const navbarClasses =
    theme === 'dark'
      ? 'bg-blue-900 text-white drop-shadow-xl'
      : 'bg-emerald-400 text-gray-900 drop-shadow-xl';

  return (
    <nav className={`${navbarClasses} p-4 flex justify-between items-center `}>
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

      {currentPath === '/' && (
        <div className='flex items-center'>
          <span className='font-semibold text-lg text-indigo-800 drop-shadow-xl dark:text-emerald-400'>
            Click a programming language for a 'Hello, World!' example! 👇
          </span>
        </div>
      )}

      {currentPath === '/contact' && (
        <div className='flex items-center'>
          <span className='font-semibold text-lg text-indigo-800 drop-shadow-xl dark:text-emerald-400'>
            Get in touch... Send me a message! 📩
          </span>
        </div>
      )}

      {currentPath === '/about' && (
        <div className='flex items-center'>
          <span className='font-semibold text-lg text-indigo-800 drop-shadow-xl dark:text-emerald-400'>
            About the project, the developer, and his cat! 👨‍💻🐱
          </span>
        </div>
      )}

      {currentPath === '/admin-login' && (
        <div className='flex items-center'>
          <span className='font-semibold text-lg text-indigo-800 drop-shadow-xl dark:text-emerald-400'>
            Super secret login page for admins! 🤐🤫
          </span>
        </div>
      )}

      {isUnknownPath && (
        <div className='flex items-center'>
          <span className='font-semibold text-lg text-indigo-800 drop-shadow-xl dark:text-emerald-400'>
            Oops! You've discovered uncharted territory! 🌌
          </span>
        </div>
      )}

      <div>
        <Link
          to='/contact'
          className='font-semibold text-lg px-2 hover:text-blue-500 dark:hover:text-emerald-400'
        >
          Contact
        </Link>
        <Link
          to='/about'
          className='font-semibold text-lg px-2 hover:text-blue-500 dark:hover:text-emerald-400'
        >
          About
        </Link>
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

export default NavBar;
