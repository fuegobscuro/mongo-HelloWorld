import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchLanguagesRequest,
  fetchLanguagesSuccess,
  fetchLanguagesFailure,
} from '../redux/actions';
import axios from 'axios';
import HelloWorldModal from '../components/modals/HelloWorldModal';
import SortButtons from '../components/home/SortButtons';
import LoadingAnimation from '../components/common/LoadingAnimation';
import Pagination from '../components/home/Pagination';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  materialDark,
  materialLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../components/common/ThemeContext';

function Home({
  isModalOpen,
  setIsModalOpen,
  currentCode,
  currentLang,
  currentLangName,
  openModalWithCode,
}) {
  const dispatch = useDispatch();
  const languages = useSelector((state) => state.languages);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage ? Number(savedPage) : 1;
  });
  const itemsPerPage = 6;
  const [sortedLanguages, setSortedLanguages] = useState([]);

  useEffect(() => {
    document.title = `'Hello, World!' Compendium`;
  }, []);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchLanguagesRequest());
    axios
      .get('/programming-languages?includeInactive=false')
      .then((response) => {
        dispatch(fetchLanguagesSuccess(response.data));
        setSortedLanguages(response.data);
      })
      .catch((error) => {
        dispatch(fetchLanguagesFailure(error.toString()));
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage]);

  if (loading) {
    return <LoadingAnimation />;
  }

  const { theme } = useTheme();
  const syntaxStyle = theme === 'dark' ? materialDark : materialLight;

  const mainContentStyle = { minHeight: 'calc(100vh - 60px)' };

  return (
    <div className='bg-gray-200'>
      <div className='container mx-auto p-4' style={mainContentStyle}>
        <SortButtons
          languages={languages}
          setCurrentSortedLanguages={setSortedLanguages}
          initialSortOrder='TIOBE Ranking'
          onSortOrderChange={() => setCurrentPage(1)}
        />
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
          {sortedLanguages
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((language) => (
              <div
                key={language._id}
                onClick={() =>
                  openModalWithCode(
                    language.helloWorldCode,
                    language.codeLang,
                    language.name
                  )
                }
                className='relative card bg-gray-50 text-gray-900 dark:bg-gray-800 dark:text-gray-100 shadow-lg rounded-lg p-4 cursor-pointer hover:bg-emerald-50 dark:hover:bg-gray-700 overflow-hidden flex flex-col h-[235px] justify-between'
              >
                <div>
                  <h2 className='font-bold text-2xl mb-2 text-indigo-800 dark:text-emerald-500'>
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
        </div>
        <footer className='mt-4'>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItems={languages.length}
            itemsPerPage={itemsPerPage}
          />
        </footer>
        {isModalOpen && (
          <HelloWorldModal
            onClose={() => setIsModalOpen(false)}
            langName={currentLangName}
          >
            <SyntaxHighlighter
              language={currentLang}
              style={syntaxStyle}
              className='shadow-sm drop-shadow-md rounded-md'
            >
              {currentCode}
            </SyntaxHighlighter>
          </HelloWorldModal>
        )}
      </div>
    </div>
  );
}

export default Home;
