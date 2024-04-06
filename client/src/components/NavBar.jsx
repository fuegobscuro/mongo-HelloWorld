import React from 'react';
import { useTheme } from '../components/ThemeContext';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const icon = theme === 'dark' ? '☀️' : '🌑';
  const navbarClasses =
    theme === 'dark'
      ? 'bg-blue-800 text-white drop-shadow-sm' // NavBar light when the app is dark
      : 'bg-yellow-200 text-gray-900 drop-shadow-sm'; // NavBar dark when the app is light

  return (
    <nav className={`${navbarClasses} p-4 flex justify-between items-center `}>
      <Link to='/' title='Return Home'>
        <div className='flex items-center'>
          <div className='px-2 text-xl'>👋🌍</div>
          <span className='px-2 font-extrabold text-xl'>
            Hello World Compendium
          </span>
        </div>
      </Link>

      {location.pathname === '/' && (
        <div className='flex items-center'>
          <span className='font-semibold text-lg text-indigo-800 dark:text-emerald-500'>
            Click a programming language for a "Hello, World!" example! 👇
          </span>
        </div>
      )}

      {location.pathname === '/contact' && (
        <div className='flex items-center'>
          <span className='font-semibold text-lg text-indigo-800 dark:text-emerald-500'>
            Get in touch... Send me a message! 📩
          </span>
        </div>
      )}

      {location.pathname === '/about' && (
        <div className='flex items-center'>
          <span className='font-semibold text-lg text-indigo-800 dark:text-emerald-500'>
            About the project and the developer! 👨‍💻
          </span>
        </div>
      )}

      {location.pathname === '/admin' && (
        <div className='flex items-center'>
          <span className='font-semibold text-lg text-indigo-800 dark:text-emerald-500'>
            Super secret login page for admins! 🤐
          </span>
        </div>
      )}

      <div>
        <Link
          to='/contact'
          className='font-semibold text-lg px-2 hover:text-gray-300'
        >
          Contact
        </Link>
        <Link
          to='/about'
          className='font-semibold text-lg px-2 hover:text-gray-300'
        >
          About
        </Link>
        <button
          title='Toggle Light/Dark Mode'
          onClick={toggleTheme}
          className='px-2 text-lg'
        >
          {icon}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
