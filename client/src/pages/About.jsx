import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext';
import ignacioPic from '../utils/images/ignaciofosco.jpg';
import darkBabyLunaPic from '../utils/images/darkbabyluna.jpg';

const About = () => {
  const { theme } = useTheme();
  const aboutClasses =
    theme === 'dark' ? 'text-white bg-gray-800' : 'text-gray-900 bg-gray-100';

  useEffect(() => {
    document.title = 'About';
  }, []);

  const mainContentStyle = { minHeight: 'calc(100vh - 60px)' };

  return (
    <div
      className={`px-4 pt-4 pb-2 ${aboutClasses} flex flex-col items-center overflow-auto`}
      style={mainContentStyle}
    >
      <div className='flex flex-wrap justify-center items-center w-full mb-4'>
        <div className='text-center m-4 mr-12'>
          <img
            src={ignacioPic}
            alt='Ignacio Fosco'
            className='rounded-xl w-20 h-30 mb-2 mx-auto'
          />
          <p className='text-lg mb-2'>
            Developed by <b>Ignacio Fosco</b> (aka <b>fuegobscuro</b>) 🧙🔥
          </p>
          <div className='flex justify-center space-x-4 mt-2'>
            <a
              href='https://github.com/fuegobscuro'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='devicon-github-original colored text-3xl ml-3 drop-shadow-sm dark:invert'></i>
            </a>

            <a
              href='https://www.linkedin.com/in/ignaciofosco/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='devicon-linkedin-plain colored text-3xl ml-3 drop-shadow-sm'></i>
            </a>

            <a
              href='mailto:ignaciofosco@gmail.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src='https://cdn.simpleicons.org/gmail/#EA4335'
                alt='Gmail icon'
                className='h-8 w-8 mx-auto mt-0.5 ml-3 drop-shadow-sm'
              />
            </a>
          </div>
          {/* <p className="text-sm mb-2">
            GitHub <b>|</b> LinkedIn <b>|</b> Gmail
          </p> */}
        </div>
        <div className='text-center m-4'>
          <img
            src={darkBabyLunaPic}
            alt='Dark Baby Luna'
            className='rounded-xl w-20 h-30 mb-2 mx-auto'
          />
          <p className='text-lg mb-2'>
            My faithful companion, <b>Dark Baby Luna</b> 🐈🐾
          </p>
          <a
            href='https://www.instagram.com/darkbabyluna/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='https://cdn.simpleicons.org/instagram/#E4405F'
              alt='Instagram icon'
              className='h-8 w-8 mx-auto mt-2 drop-shadow-sm'
            />
          </a>
          {/* <p className="text-sm mb-2">Instagram</p> */}
        </div>
      </div>{' '}
      <h2 className='text-3xl font-bold text-center mb-6'>Tech Stack Used</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-20 text-justify'>
        <div>
          {' '}
          {/* Programming Language and Front-end */}
          <i className='devicon-javascript-plain colored text-2xl drop-shadow-sm'></i>{' '}
          <span className='text-lg'>JavaScript</span>
          <p className='font-bold text-lg mt-4 mb-2'>Front-end:</p>
          <i className='devicon-react-original colored text-2xl drop-shadow-sm'></i>{' '}
          <span className='text-lg'>React</span>
          <br />
          <i className='devicon-tailwindcss-plain colored text-2xl drop-shadow-sm'></i>{' '}
          <span className='text-lg'>TailwindCSS</span>
          <br />
          <i className='devicon-postcss-plain colored text-2xl drop-shadow-sm'></i>{' '}
          <span className='text-lg'>PostCSS</span>
        </div>

        <div>
          {' '}
          {/* Back-end */}
          <p className='font-bold text-lg mt-4 md:mt-0 mb-2'>Back-end:</p>
          <i className='devicon-express-original colored text-2xl drop-shadow-sm dark:invert'></i>{' '}
          <span className='text-lg'>Express.js</span>
          <br />
          <i className='devicon-nodejs-plain colored text-2xl drop-shadow-sm'></i>{' '}
          <span className='text-lg'>Node.js</span>
          <br />
          <i className='devicon-mongodb-plain colored text-2xl drop-shadow-sm'></i>{' '}
          <span className='text-lg'>MongoDB</span>
          <br />
          <i className='devicon-mongoose-original colored text-2xl drop-shadow-sm dark:invert'></i>{' '}
          <span className='text-lg'>Mongoose</span>
        </div>

        <div>
          {' '}
          {/* Libraries & Tools */}
          <p className='font-bold text-lg mt-4 md:mt-0 mb-2'>
            Libraries & Tools:
          </p>
          <i className='devicon-axios-plain colored text-2xl drop-shadow-sm'></i>{' '}
          <span className='text-lg mb-2'>Axios</span>
          <br />
          <i className='devicon-git-plain colored text-2xl drop-shadow-sm'></i>{' '}
          <span className='text-lg mb-2'>Git</span>
          <br />
          <i className='devicon-devicon-plain colored text-2x1 drop-shadow-sm'></i>{' '}
          <span className='text-lg mb-2'>Devicon</span>
          <br />
          <img
            src='https://cdn.simpleicons.org/simpleicons/#111111'
            alt='Simple Icons icon'
            className='h-6 w-6 inline mb-2 drop-shadow-sm dark:invert'
          />{' '}
          <span className='text-lg'>Simple Icons</span>
          <br />
          <img
            src='https://avatars.githubusercontent.com/u/68967643?s=200&v=4'
            alt='Syntax Highlighter icon'
            className='h-6 w-6 inline rounded-full drop-shadow-sm dark:invert'
          />{' '}
          <span className='text-lg mb-2'>Syntax Highlighter</span>
        </div>
      </div>
      <div className='absolute bottom-10 right-20'>
        <Link
          to='/'
          className='bg-gray-300 drop-shadow-sm hover:bg-yellow-200 text-black font-bold py-2 px-4 rounded dark:invert'
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default About;
