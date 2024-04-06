// Action Types
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const SET_UNAUTHENTICATED = 'SET_UNAUTHENTICATED';
export const SET_LOADING = 'SET_LOADING';
export const UNSET_LOADING = 'UNSET_LOADING';

// Action Creators
export const setAuthenticated = () => ({
  type: SET_AUTHENTICATED,
});
export const setUnauthenticated = () => ({
  type: SET_UNAUTHENTICATED,
});

export const setLoading = () => ({ type: SET_LOADING });
export const unsetLoading = () => ({ type: UNSET_LOADING });
