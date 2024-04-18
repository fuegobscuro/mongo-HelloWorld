import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ignacioPic from '../utils/images/ignaciofosco.jpg';
import darkBabyLunaPic from '../utils/images/darkbabyluna.jpg';
import LoadingAnimation from '../components/common/LoadingAnimation';

const About = () => {
  useEffect(() => {
    document.title = 'About';
  }, []);

  const [imageLoaded, setImageLoaded] = useState({
    ignacio: false,
    luna: false,
  });

  const allImagesLoaded = Object.values(imageLoaded).every(Boolean);

  const mainContentStyle = { minHeight: 'calc(100vh - 60px)' };

  const handleImageLoaded = (image) => {
    setImageLoaded((prev) => ({ ...prev, [image]: true }));
  };

  return (
    <div
      className={`p-2 text-gray-900 bg-gray-200 dark:text-white flex flex-col items-center overflow-auto`}
      style={mainContentStyle}
    >
      {!allImagesLoaded && <LoadingAnimation />}

      <div className='bg-white dark:bg-gray-800 rounded-xl p-2 drop-shadow-md'>
        <div className='flex flex-wrap justify-center items-center w-full'>
          {/* Ignacio Fosco's Box */}
          <div className='flex flex-col items-center bg-green-100 dark:bg-blue-900 rounded-xl p-3 drop-shadow-md m-3'>
            <img
              src={ignacioPic}
              alt='Ignacio Fosco'
              onLoad={() => handleImageLoaded('ignacio')}
              className='rounded-xl w-24 h-36 mb-2 shadow-md drop-shadow-md'
            />
            <p className='text-md mb-2 text-center'>
              <span className='font-bold text-md text-indigo-900 dark:text-yellow-400'>
                Web Development:{' '}
              </span>
              <b>Ignacio Fosco</b> 🧙🔥
            </p>
            <div className='flex justify-center space-x-4'>
              <a
                href='https://github.com/ignaciofosco'
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
          </div>

          <div className='flex flex-col items-center bg-green-100 dark:bg-blue-900 rounded-xl p-3 drop-shadow-md m-3'>
            <img
              src={darkBabyLunaPic}
              alt='Dark Baby Luna'
              onLoad={() => handleImageLoaded('luna')}
              className='rounded-xl w-24 h-36 mb-2 shadow-md drop-shadow-md'
            />
            <p className='text-md mb-2 text-center'>
              <span className='font-bold text-md text-indigo-900 dark:text-yellow-400'>
                QA Specialist:{' '}
              </span>
              <b>Dark Baby Luna</b> 🐈🐾
            </p>
            <a
              href='https://www.instagram.com/darkbabyluna/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src='https://cdn.simpleicons.org/instagram/#E4405F'
                alt='Instagram icon'
                className='h-8 w-8 mb-1 drop-shadow-sm'
              />
            </a>
          </div>
        </div>{' '}
        <h2 className='text-2xl font-bold text-center mb-2'>Tech Stack Used</h2>
        <div className='flex flex-col items-center bg-green-100 dark:bg-blue-900 rounded-xl px-2.5 py-2.5 drop-shadow-md m-3'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-16'>
            <div className='space-y-2 text-left justify-center'>
              <p className='font-bold text-md text-indigo-900 dark:text-yellow-400 justify-center'>
                Language:
              </p>
              <i className='devicon-javascript-plain colored text-2xl drop-shadow-sm'></i>{' '}
              <span className='text-md'>JavaScript</span>
              <p className='font-bold text-md text-indigo-900 dark:text-yellow-400 mt-4 mb-2'>
                Front-end:
              </p>
              <i className='devicon-react-original colored text-2xl drop-shadow-sm'></i>{' '}
              <span className='text-md'>React</span>
              <br />
              <i className='devicon-tailwindcss-plain colored text-2xl drop-shadow-sm'></i>{' '}
              <span className='text-md'>TailwindCSS</span>
              <br />
              <i className='devicon-postcss-plain colored text-2xl drop-shadow-sm'></i>{' '}
              <span className='text-md'>PostCSS</span>
            </div>

            <div className='space-y-2 text-left'>
              {' '}
              {/* Back-end */}
              <p className='font-bold text-md text-indigo-900 dark:text-yellow-400'>
                Back-end:
              </p>
              <i className='devicon-express-original colored text-2xl drop-shadow-sm dark:invert'></i>{' '}
              <span className='text-md'>Express.js</span>
              <br />
              <i className='devicon-nodejs-plain colored text-2xl drop-shadow-sm'></i>{' '}
              <span className='text-md'>Node.js</span>
              <br />
              <i className='devicon-mongodb-plain colored text-2xl drop-shadow-sm'></i>{' '}
              <span className='text-md'>MongoDB</span>
              <br />
              <i className='devicon-mongoose-original colored text-2xl drop-shadow-sm dark:invert'></i>{' '}
              <span className='text-md'>Mongoose</span>
            </div>

            <div className='space-y-2 text-left'>
              {' '}
              {/* Libraries & Tools */}
              <p className='font-bold text-md text-indigo-900 dark:text-yellow-400'>
                Libraries & Tools:
              </p>
              <i className='devicon-axios-plain colored text-2xl drop-shadow-sm dark:invert'></i>{' '}
              <span className='text-md mb-2'>Axios</span>
              <br />
              <i className='devicon-git-plain colored text-2xl drop-shadow-sm'></i>{' '}
              <span className='text-md mb-2'>Git</span>
              <br />
              <i className='devicon-devicon-plain colored text-2x1 drop-shadow-sm'></i>{' '}
              <span className='text-md mb-2'>Devicon</span>
              <br />
              <img
                src='https://cdn.simpleicons.org/simpleicons/#111111'
                alt='Simple Icons icon'
                className='h-6 w-6 inline mb-2 drop-shadow-sm dark:invert'
              />{' '}
              <span className='text-md'>Simple Icons</span>
              <br />
              <img
                src='https://avatars.githubusercontent.com/u/68967643?s=200&v=4'
                alt='Syntax Highlighter icon'
                className='h-6 w-6 inline rounded-full drop-shadow-sm'
              />{' '}
              <span className='text-md mb-2'>Syntax Highlighter</span>
            </div>
          </div>
        </div>
      </div>
      <div className='absolute bottom-12 right-20'>
        <Link
          to='/'
          className='bg-emerald-400 hover:bg-emerald-300  drop-shadow-sm text-black font-bold py-2 px-4 rounded dark:bg-blue-800 dark:text-white dark:hover:bg-blue-700'
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default About;
