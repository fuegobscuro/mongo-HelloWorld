import React, { useState, useEffect } from 'react';

function SortButtons({
  languages,
  setCurrentSortedLanguages,
  initialSortOrder = 'TIOBE Ranking',
  onSortOrderChange,
}) {
  const [sortOrder, setSortOrder] = useState(() => {
    const savedSortOrder = localStorage.getItem('sortOrder');
    return savedSortOrder || initialSortOrder;
  });

  useEffect(() => {
    const sortedLanguages = [...languages].sort((a, b) => {
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
    setCurrentSortedLanguages(sortedLanguages);
    localStorage.setItem('sortOrder', sortOrder);
  }, [sortOrder, languages]);

  const handleSortChange = (newSortOrder) => {
    if (newSortOrder !== sortOrder) {
      // Check if the sort order has actually changed
      setSortOrder(newSortOrder);
      onSortOrderChange(); // Only call the reset pagination function if sort order changes
    }
  };

  const buttonClass =
    'mx-0.5 bg-emerald-300 drop-shadow-sm hover:bg-emerald-200 text-black font-bold py-2 px-4 rounded dark:bg-indigo-800 dark:text-white dark:hover:bg-indigo-700';

  return (
    <div className='mb-4 items-center text-center'>
      <span className='text-lg font-medium'>
        <b className='text-xl mx-1 font-bold text-indigo-800 drop-shadow-sm dark:text-emerald-800'>
          Sort by:
        </b>
      </span>
      {['A-Z', 'Z-A', 'Newest', 'Oldest', 'TIOBE Ranking'].map((sortType) => (
        <button
          key={sortType}
          onClick={() => handleSortChange(sortType)}
          className={`${buttonClass} ${
            sortOrder === sortType ? 'active-class-for-button' : ''
          }`}
        >
          {sortType}
        </button>
      ))}
    </div>
  );
}

export default SortButtons;
