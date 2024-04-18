import React from 'react';

function Pagination({ currentPage, setCurrentPage, totalItems, itemsPerPage }) {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className='pagination flex justify-center items-center gap-2.5 text-indigo-800 drop-shadow-sm dark:text-emerald-800'>
      {currentPage > 1 && (
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className='font-semibold text-lg drop-shadow-sm'
        >
          &laquo; Back
        </button>
      )}
      {Array.from({ length: pageCount }, (_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`${
            currentPage === i + 1
              ? 'font-bold text-xl drop-shadow-sm'
              : 'text-lg drop-shadow-sm'
          }`}
        >
          {i + 1}
        </button>
      ))}
      {currentPage < pageCount && (
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className='font-semibold text-lg drop-shadow-sm'
        >
          &raquo; Next
        </button>
      )}
    </div>
  );
}

export default Pagination;
