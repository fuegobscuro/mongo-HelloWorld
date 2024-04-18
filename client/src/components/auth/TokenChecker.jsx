import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setToken,
  removeToken,
  setUserRole,
  removeUserRole,
} from '../../redux/actions';
import LoadingAnimation from '../common/LoadingAnimation';

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

const TokenChecker = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const token =
    useSelector((state) => state.token) || localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const decoded = parseJwt(token);
      if (decoded && new Date(decoded.exp * 1000) > new Date()) {
        dispatch(setToken(token));
        dispatch(setUserRole(decoded.user_role));
      } else {
        dispatch(removeToken());
        dispatch(removeUserRole());
      }
    }
    setLoading(false);
  }, [dispatch, token]);

  if (loading) {
    return <LoadingAnimation />;
  }

  return children;
};

export default TokenChecker;
