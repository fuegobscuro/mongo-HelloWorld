import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortOrder } from '../../redux/actions';

function SortButtons({ onSortOrderChange }) {
  const dispatch = useDispatch();
  const sortOrder = useSelector((state) => state.sortOrder);

  const handleSortChange = (newSortOrder) => {
    if (newSortOrder !== sortOrder) {
      dispatch(setSortOrder(newSortOrder));
      onSortOrderChange(newSortOrder);
    }
  };

  const buttonClass =
    'mx-0.5 bg-emerald-300 drop-shadow-sm hover:bg-emerald-200 text-black font-bold py-2 px-4 rounded dark:bg-indigo-800 dark:text-white dark:hover:bg-indigo-700';

  return (
    <div className='mb-4 flex items-center text-center'>
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
