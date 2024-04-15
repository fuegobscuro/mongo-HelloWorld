// Action Types
export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const SET_LOADING = 'SET_LOADING';
export const UNSET_LOADING = 'UNSET_LOADING';

// Action Creators
export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
});
export const removeToken = () => ({
  type: REMOVE_TOKEN,
});

export const setLoading = () => ({ type: SET_LOADING });
export const unsetLoading = () => ({ type: UNSET_LOADING });
