// ACTION TYPES:
// PROGRAMMING LANGUAGES
export const FETCH_LANGUAGES_REQUEST = 'FETCH_LANGUAGES_REQUEST';
export const FETCH_LANGUAGES_SUCCESS = 'FETCH_LANGUAGES_SUCCESS';
export const FETCH_LANGUAGES_FAILURE = 'FETCH_LANGUAGES_FAILURE';
export const CREATE_LANGUAGE = 'CREATE_LANGUAGE';
export const UPDATE_LANGUAGE = 'UPDATE_LANGUAGE';
export const DELETE_LANGUAGE = 'DELETE_LANGUAGE';
// USERS
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
// CONTACT MESSAGES
export const FETCH_CONTACT_MESSAGES_REQUEST = 'FETCH_CONTACT_MESSAGES_REQUEST';
export const FETCH_CONTACT_MESSAGES_SUCCESS = 'FETCH_CONTACT_MESSAGES_SUCCESS';
export const FETCH_CONTACT_MESSAGES_FAILURE = 'FETCH_CONTACT_MESSAGES_FAILURE';
export const CREATE_CONTACT_MESSAGE = 'CREATE_CONTACT_MESSAGE';
export const DELETE_CONTACT_MESSAGE = 'DELETE_CONTACT_MESSAGE';
// AUTH: TOKEN & USER LEVEL
export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const SET_USER_LEVEL = 'SET_USER_LEVEL';
export const REMOVE_USER_LEVEL = 'REMOVE_USER_LEVEL';
// SORTING
export const SET_SORT_ORDER = 'SET_SORT_ORDER';
// FILTERS
export const SET_YEAR_FILTER = 'SET_YEAR_FILTER';
export const SET_TIOBE_FILTER = 'SET_TIOBE_FILTER';
// SEARCH
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
// HOME PAGINATION
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

// ACTION CREATORS:
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
export const deleteLanguage = (id) => ({
  type: DELETE_LANGUAGE,
  payload: id,
});

// USERS
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
export const deleteUser = (id) => ({
  type: DELETE_USER,
  payload: id,
});

// CONTACT MESSAGES
export const fetchContactMessagesRequest = () => ({
  type: FETCH_CONTACT_MESSAGES_REQUEST,
});
export const fetchContactMessagesSuccess = (contactMessages) => ({
  type: FETCH_CONTACT_MESSAGES_SUCCESS,
  payload: contactMessages,
});
export const fetchContactMessagesFailure = (error) => ({
  type: FETCH_CONTACT_MESSAGES_FAILURE,
  payload: error,
});
export const createContactMessage = (contactMessageData) => ({
  type: CREATE_CONTACT_MESSAGE,
  payload: contactMessageData,
});
export const deleteContactMessage = (id) => ({
  type: DELETE_CONTACT_MESSAGE,
  payload: id,
});

// AUTH: TOKEN & USER LEVEL
export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
});
export const removeToken = () => ({
  type: REMOVE_TOKEN,
});

export const setUserLevel = (level) => ({
  type: SET_USER_LEVEL,
  payload: level,
});
export const removeUserLevel = () => ({
  type: REMOVE_USER_LEVEL,
});

// LANGUAGE SORTING
export const setSortOrder = (sortOrder) => ({
  type: SET_SORT_ORDER,
  payload: sortOrder,
});

// LANGUAGE FILTERS
export const setYearFilter = (min, max) => ({
  type: SET_YEAR_FILTER,
  payload: { min, max },
});
export const setTiobeFilter = (min, max) => ({
  type: SET_TIOBE_FILTER,
  payload: { min, max },
});

// SEARCH
export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});

// HOME PAGINATION
export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});
