import React, { useState, useEffect } from 'react';
import { Range } from 'react-range';

function FilterSliders({
  yearRange,
  tiobeRange,
  setYearFilter,
  setTiobeFilter,
}) {
  const [yearValues, setYearValues] = useState([yearRange.min, yearRange.max]);
  const [tiobeValues, setTiobeValues] = useState([
    tiobeRange.min,
    tiobeRange.max,
  ]);

  useEffect(() => {
    if (yearRange.min !== null && yearRange.max !== null) {
      setYearValues([yearRange.min, yearRange.max]);
    }
  }, [yearRange.min, yearRange.max]);

  useEffect(() => {
    if (tiobeRange.min !== null && tiobeRange.max !== null) {
      setTiobeValues([tiobeRange.min, tiobeRange.max]);
    }
  }, [tiobeRange.min, tiobeRange.max]);

  const handleYearChange = (values) => setYearValues(values);
  const handleYearFinalChange = (values) => setYearFilter(values[0], values[1]);

  const handleTiobeChange = (values) => setTiobeValues(values);
  const handleTiobeFinalChange = (values) =>
    setTiobeFilter(values[0], values[1]);

  return (
    <div className='mb-4 grid grid-cols-[1fr_2fr_2fr] items-center'>
      <div className='text-lg font-medium text-center'>
        <b className='text-xl font-bold text-indigo-800 drop-shadow-sm dark:text-emerald-800'>
          Filter by:
        </b>
      </div>
      <div className='pl-3 pr-4 mb-2'>
        {' '}
        {/* Adding padding to slider containers */}
        {yearRange.min !== null && yearRange.max !== null && (
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              <b>Year Created: </b>
              {yearValues[0]} - {yearValues[1]}
            </label>
            <Range
              step={1}
              min={1949}
              max={2014}
              values={yearValues}
              onChange={handleYearChange}
              onFinalChange={handleYearFinalChange}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className='h-2 bg-gray-300 rounded'
                  style={{ ...props.style }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className='w-4 h-4 bg-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              )}
            />
          </div>
        )}
      </div>
      <div className='pl-2 pr-4 mb-2'>
        {' '}
        {/* Symmetric padding for the second slider */}
        {tiobeRange.min !== null && tiobeRange.max !== null && (
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              <b>TIOBE Ranking: </b>
              {tiobeValues[0]} - {tiobeValues[1]}
            </label>
            <Range
              step={1}
              min={1}
              max={101}
              values={tiobeValues}
              onChange={handleTiobeChange}
              onFinalChange={handleTiobeFinalChange}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className='h-2 bg-gray-300 rounded'
                  style={{ ...props.style }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className='w-4 h-4 bg-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterSliders;
