// Action Types
// PROGRAMMING LANGUAGES
export const FETCH_LANGUAGES_REQUEST = 'FETCH_LANGUAGES_REQUEST';
export const FETCH_LANGUAGES_SUCCESS = 'FETCH_LANGUAGES_SUCCESS';
export const FETCH_LANGUAGES_FAILURE = 'FETCH_LANGUAGES_FAILURE';
export const CREATE_LANGUAGE = 'CREATE_LANGUAGE';
export const UPDATE_LANGUAGE = 'UPDATE_LANGUAGE';
export const UPDATE_LANGUAGE_STATUS = 'UPDATE_LANGUAGE_STATUS';
export const DELETE_LANGUAGE = 'DELETE_LANGUAGE';
// USERS
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_STATUS = 'UPDATE_USER_STATUS';
export const DELETE_USER = 'DELETE_USER';
// AUTH
export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const SET_USER_ROLE = 'SET_USER_ROLE';
export const REMOVE_USER_ROLE = 'REMOVE_USER_ROLE';

// Action Creators
// PROGRAMMING LANGUAGES
export const fetchLanguagesRequest = () => ({
  type: FETCH_LANGUAGES_REQUEST,
});
export const fetchLanguagesSuccess = (languages) => ({
  type: FETCH_LANGUAGES_SUCCESS,
  payload: languages,
});
export const fetchLanguagesFailure = (error) => ({
  type: FETCH_LANGUAGES_FAILURE,
  payload: error,
});
export const createLanguage = (languageData) => ({
  type: CREATE_LANGUAGE,
  payload: languageData,
});
export const updateLanguage = (id, languageData) => ({
  type: UPDATE_LANGUAGE,
  payload: { id, languageData },
});
export const updateLanguageStatus = (id, isActive) => ({
  type: UPDATE_LANGUAGE_STATUS,
  payload: { id, isActive },
});
export const deleteLanguage = (id) => ({
  type: DELETE_LANGUAGE,
  payload: id,
});

// USERS
// PROGRAMMING LANGUAGES
export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});
export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});
export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});
export const createUser = (userData) => ({
  type: CREATE_USER,
  payload: userData,
});
export const updateUser = (id, userData) => ({
  type: UPDATE_USER,
  payload: { id, userData },
});
export const updateUserStatus = (id, isActive) => ({
  type: UPDATE_USER_STATUS,
  payload: { id, isActive },
});
export const deleteUser = (id) => ({
  type: DELETE_USER,
  payload: id,
});

// AUTH
export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
});
export const removeToken = () => ({
  type: REMOVE_TOKEN,
});

export const setUserRole = (role) => ({
  type: SET_USER_ROLE,
  payload: role,
});
export const removeUserRole = () => ({
  type: REMOVE_USER_ROLE,
});
