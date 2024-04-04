import React from 'react';
import { useTheme } from '../components/ThemeContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  const icon = theme === 'dark' ? '☀️' : '🌑';
  const navbarClasses =
    theme === 'dark'
      ? 'bg-blue-800 text-white shadow-xl' // NavBar light when the app is dark
      : 'bg-yellow-200 text-gray-900 shadow-xl'; // NavBar dark when the app is light

  return (
    <nav className={`${navbarClasses} p-4 flex justify-between items-center `}>
      <Link to='/'>
        <div className='flex items-center'>
          <div className='mr-4'>👋🌍</div>
          <span className='font-semibold text-xl'>Hello World Compendium</span>
        </div>
      </Link>
      <div className='flex items-center'>
        <span className='font-semibold text-indigo-800 dark:text-emerald-300'>
          Click a programming language for a "Hello World" example!
        </span>
      </div>

      <div>
        <Link
          to='/contact'
          className='font-semibold mr-4 hover:text-gray-300 dark:hover:text-gray-600'
        >
          Contact
        </Link>
        <Link
          to='/about'
          className='font-semibold mr-4 hover:text-gray-300 dark:hover:text-gray-600'
        >
          About
        </Link>
        <button onClick={toggleTheme} className='ml-4'>
          {icon}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
