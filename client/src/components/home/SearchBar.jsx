import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../redux/actions';

function SearchBar() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInput(e.target.value);
    dispatch(setSearchQuery(e.target.value));
  };

  const handleClearInput = () => {
    setInput(''); // Clear the input field
    dispatch(setSearchQuery('')); // Update the search query in the store
  };

  return (
    <div className='mb-4 flex items-center text-center relative'>
      <input
        type='text'
        placeholder='Search languages...'
        value={input}
        onChange={handleInputChange}
        className='text-start block p-2 pl-4 w-72 rounded-md border-gray-300 shadow-sm border focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none'
      />
      {!input && (
        <button className='absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer'>
          🔍
        </button>
      )}
      {input && (
        <button
          className='absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer'
          onClick={handleClearInput}
        >
          ✖️
        </button>
      )}
    </div>
  );
}

export default SearchBar;
