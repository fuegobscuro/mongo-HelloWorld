import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, removeToken } from '../../redux/actions';
import axios from 'axios';
import LoadingAnimation from '../common/LoadingAnimation';

const TokenChecker = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('/auth/token', { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          if (response.data.isValid) {
            dispatch(setToken(token));
          } else {
            clearTokenData();
          }
        })
        .catch(() => {
          clearTokenData();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  const clearTokenData = () => {
    localStorage.removeItem('token');
    dispatch(removeToken());
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  return children;
};

export default TokenChecker;
