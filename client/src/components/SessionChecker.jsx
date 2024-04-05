import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthenticated, setUnauthenticated } from '../redux/actions';
import axios from 'axios';

const SessionChecker = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get('/session')
      .then((response) => {
        if (response.status === 200) {
          dispatch(setAuthenticated());
        } else {
          dispatch(setUnauthenticated());
        }
      })
      .catch(() => {
        dispatch(setUnauthenticated());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Or some loading indicator
  }

  return children;
};

export default SessionChecker;
