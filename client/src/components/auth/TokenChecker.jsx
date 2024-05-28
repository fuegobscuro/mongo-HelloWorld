import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {
  setToken,
  removeToken,
  setUserLevel,
  removeUserLevel,
} from '../../redux/actions';
import LoadingAnimation from '../common/LoadingAnimation';

const TokenChecker = () => {
  const dispatch = useDispatch();
  const reduxToken = useSelector((state) => state.token); // Always call useSelector
  const localStorageToken = localStorage.getItem('token');
  const token = localStorageToken || reduxToken;
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function validateToken() {
      if (token) {
        const decoded = jwtDecode(token);
        if (decoded && new Date(decoded.exp * 1000) > new Date()) {
          dispatch(setToken(token));
          dispatch(setUserLevel(decoded.level));
          setAuthorized(true);
        } else {
          dispatch(removeToken());
          dispatch(removeUserLevel());
          setAuthorized(false);
        }
      } else {
        setAuthorized(false);
      }
      setLoading(false);
    }

    validateToken();
  }, [dispatch, token]);

  if (loading) {
    return <LoadingAnimation />;
  }

  if (!authorized) {
    return <Navigate to='/admin-login' />;
  }

  return <Outlet />;
};

export default TokenChecker;
