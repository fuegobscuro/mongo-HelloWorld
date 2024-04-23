import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Range, getTrackBackground } from 'react-range';
import { setYearFilter, setTiobeFilter } from '../../redux/actions';

function HomeFilters() {
  const dispatch = useDispatch();
  const languages = useSelector((state) => state.languages);

  // Calculate initial values for the sliders based on actual data
  const findRange = (data, key) => {
    const validData = data.filter(
      (item) => item[key] !== undefined && item[key] !== null
    );
    const values = validData.map((item) => item[key]);
    return values.length ? [Math.min(...values), Math.max(...values)] : [0, 0];
  };

  const initialYearRange = findRange(languages, 'year');
  const initialTiobeRange = findRange(languages, 'tiobeRank');

  const [yearValues, setYearValues] = useState(initialYearRange);
  const [tiobeValues, setTiobeValues] = useState(initialTiobeRange);

  useEffect(() => {
    // Update slider ranges if data changes
    setYearValues(findRange(languages, 'year'));
    setTiobeValues(findRange(languages, 'tiobeRank'));
  }, [languages]);

  const handleYearChange = (values) => {
    setYearValues(values);
    dispatch(setYearFilter({ min: values[0], max: values[1] }));
  };

  const handleTiobeChange = (values) => {
    setTiobeValues(values);
    dispatch(setTiobeFilter({ min: values[0], max: values[1] }));
  };

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Year Created Range: {yearValues[0]} - {yearValues[1]}
        </label>
        <Range
          step={1}
          min={initialYearRange[0]}
          max={initialYearRange[1]}
          values={yearValues}
          onChange={handleYearChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '6px',
                width: '100%',
                backgroundColor: '#ccc',
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '24px',
                width: '24px',
                backgroundColor: '#999',
              }}
            />
          )}
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          TIOBE Ranking Range: {tiobeValues[0]} - {tiobeValues[1]}
        </label>
        <Range
          step={1}
          min={initialTiobeRange[0]}
          max={initialTiobeRange[1]}
          values={tiobeValues}
          onChange={handleTiobeChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '6px',
                width: '100%',
                backgroundColor: '#ccc',
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '24px',
                width: '24px',
                backgroundColor: '#999',
              }}
            />
          )}
        />
      </div>
    </div>
  );
}

export default HomeFilters;
