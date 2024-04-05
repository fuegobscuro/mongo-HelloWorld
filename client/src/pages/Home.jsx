import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function Home({
  languages,
  isModalOpen,
  setIsModalOpen,
  currentCode,
  currentLang,
  currentLangName,
  openModalWithCode,
}) {
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage ? Number(savedPage) : 1;
  });
  const [sortOrder, setSortOrder] = useState(() => {
    const savedSortOrder = localStorage.getItem('sortOrder');
    return savedSortOrder || 'TIOBE Ranking';
  });
  const itemsPerPage = 6;
  const [sortedLanguages, setSortedLanguages] = useState([]);

  useEffect(() => {
    document.title = 'Hello World Compendium';
  }, []);

  // Effect for fetching languages based on sortOrder and storing sorted languages
  useEffect(() => {
    const handleSortChange = [...languages].sort((a, b) => {
      switch (sortOrder) {
        case 'A-Z':
          return a.name.localeCompare(b.name);
        case 'Z-A':
          return b.name.localeCompare(a.name);
        case 'Newest':
          return b.year - a.year;
        case 'Oldest':
          return a.year - b.year;
        case 'TIOBE Ranking':
          return a.tiobeRank - b.tiobeRank;
        default:
          return 0;
      }
    });
    setSortedLanguages(handleSortChange);
  }, [sortOrder, languages]);

  // Effect for updating currentPage in localStorage
  useEffect(() => {
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage]);

  // Effect for updating sortOrder in localStorage
  useEffect(() => {
    localStorage.setItem('sortOrder', sortOrder);
  }, [sortOrder]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLanguages = sortedLanguages.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    setCurrentPage(1); // Reset to page 1 on sort to avoid confusion with pagination
  };

  const mainContentStyle = { minHeight: 'calc(100vh - 60px)' };

  return (
    <div className='container mx-auto p-4 bg-gray-100' style={mainContentStyle}>
      <div className='mb-4 text-center'>
        <span class='text-lg font-medium'>
          <b class='text-xl font-bold text-indigo-800 drop-shadow-sm dark:text-emerald-700'>
            Sort by:
          </b>
        </span>
        <button
          onClick={() => handleSortChange('A-Z')}
          className='drop-shadow-sm mx-2 bg-gray-300 hover:bg-yellow-200 text-black p-2 rounded text-center dark:invert'
        >
          A-Z
        </button>
        <button
          onClick={() => handleSortChange('Z-A')}
          className='drop-shadow-sm mx-2 bg-gray-300 hover:bg-yellow-200 text-black p-2 rounded text-center dark:invert'
        >
          Z-A
        </button>
        <button
          onClick={() => handleSortChange('Newest')}
          className='drop-shadow-sm mx-2 bg-gray-300 hover:bg-yellow-200 text-black p-2 rounded text-center dark:invert'
        >
          Newest
        </button>
        <button
          onClick={() => handleSortChange('Oldest')}
          className='drop-shadow-sm mx-2 bg-gray-300 hover:bg-yellow-200 text-black p-2 rounded text-center dark:invert'
        >
          Oldest
        </button>
        <button
          onClick={() => handleSortChange('TIOBE Ranking')}
          className='drop-shadow-sm mx-2 bg-gray-300 hover:bg-yellow-200 text-black p-2 rounded text-center dark:invert'
        >
          TIOBE Ranking
        </button>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 '>
        {currentLanguages.map((language) => (
          <div
            key={language._id}
            onClick={() =>
              openModalWithCode(
                language.helloWorldCode,
                language.codeLang,
                language.name
              )
            }
            className='relative card bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 shadow-lg rounded-lg p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 overflow-hidden flex flex-col h-[235px] justify-between'
          >
            <div>
              <h2 className='font-bold text-xl mb-2 text-indigo-800 dark:text-emerald-400'>
                {language.name}
              </h2>
              <p className='mb-0.5'>
                <b>Year</b>: {language.year}
              </p>
              <p className='mb-0.5'>
                <b>Creator</b>: {language.creator}
              </p>
              <p className='mb-0.5'>
                <b>TIOBE Ranking</b>: {language.tiobeRank}
              </p>
              <p className='mb-0.5'>
                <b>Description</b>: {language.description}
              </p>
            </div>
            {language.codeDevicon ? (
              <i
                className={`devicon-${language.codeDevicon}-plain colored absolute right-5 top-3 text-5xl p-1 drop-shadow-md dark:invert`}
              ></i>
            ) : (
              <img
                height='58'
                width='58'
                src={language.codeSimpleIcons}
                alt={`${language.name} icon`}
                className='plain colored absolute right-5 top-3 text-5xl p-1 drop-shadow-md dark:invert'
              />
            )}
          </div>
        ))}
      </div>{' '}
      <footer className='mt-4'>
        <div className='pagination flex justify-center items-center gap-2.5 text-indigo-800 drop-shadow-sm dark:text-emerald-700'>
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className='font-semibold drop-shadow-sm'
            >
              &laquo; Back
            </button>
          )}
          {Array.from(
            { length: Math.ceil(languages.length / itemsPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`${
                  currentPage === i + 1
                    ? 'font-bold text-lg drop-shadow-sm'
                    : 'text-base drop-shadow-sm'
                }`}
              >
                {i + 1}
              </button>
            )
          )}
          {currentPage < Math.ceil(languages.length / itemsPerPage) && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className='font-semibold drop-shadow-sm'
            >
              &raquo; Next
            </button>
          )}
        </div>
      </footer>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} langName={currentLangName}>
          <SyntaxHighlighter language={currentLang} style={dark}>
            {currentCode}
          </SyntaxHighlighter>
        </Modal>
      )}
    </div>
  );
}

export default Home;
