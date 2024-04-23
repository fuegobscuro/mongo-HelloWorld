import {
  FETCH_LANGUAGES_REQUEST,
  FETCH_LANGUAGES_SUCCESS,
  FETCH_LANGUAGES_FAILURE,
  CREATE_LANGUAGE,
  UPDATE_LANGUAGE,
  DELETE_LANGUAGE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  FETCH_CONTACT_MESSAGES_REQUEST,
  FETCH_CONTACT_MESSAGES_SUCCESS,
  FETCH_CONTACT_MESSAGES_FAILURE,
  CREATE_CONTACT_MESSAGE,
  DELETE_CONTACT_MESSAGE,
  SET_TOKEN,
  REMOVE_TOKEN,
  SET_USER_LEVEL,
  REMOVE_USER_LEVEL,
  SET_FILTERED_LANGUAGES,
  SET_YEAR_FILTER,
  SET_TIOBE_FILTER,
} from './actions';

const initialState = {
  token: localStorage.getItem('token'),
  userLevel: null,
  languages: [],
  users: [],
  contactMessages: [],
  error: '',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LANGUAGES_REQUEST:
      return {
        ...state,
      };
    case FETCH_LANGUAGES_SUCCESS:
      return {
        ...state,

        languages: action.payload,
        error: '',
      };
    case FETCH_LANGUAGES_FAILURE:
      return {
        ...state,

        languages: [],
        error: action.payload,
      };
    case CREATE_LANGUAGE:
      return {
        ...state,
        languages: [action.payload, ...state.languages],
      };
    case UPDATE_LANGUAGE:
      return {
        ...state,
        languages: state.languages.map((lang) =>
          lang._id === action.payload.id
            ? { ...lang, ...action.payload.languageData }
            : lang
        ),
      };
    case DELETE_LANGUAGE:
      return {
        ...state,
        languages: state.languages.filter(
          (lang) => lang._id !== action.payload
        ),
      };

    case FETCH_USERS_REQUEST:
      return {
        ...state,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        error: '',
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        users: [],
        error: action.payload,
      };
    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload.id
            ? { ...user, ...action.payload.userData }
            : user
        ),
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };

    case FETCH_CONTACT_MESSAGES_REQUEST:
      return {
        ...state,
      };
    case FETCH_CONTACT_MESSAGES_SUCCESS:
      return {
        ...state,
        contactMessages: action.payload,
        error: '',
      };
    case FETCH_CONTACT_MESSAGES_FAILURE:
      return {
        ...state,
        contactMessages: [],
        error: action.payload,
      };
    case CREATE_CONTACT_MESSAGE:
      return {
        ...state,
        contactMessages: [...state.contactMessages, action.payload],
      };
    case DELETE_CONTACT_MESSAGE:
      return {
        ...state,
        contactMessages: state.contactMessages.filter(
          (contactMessage) => contactMessage._id !== action.payload
        ),
      };

    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case REMOVE_TOKEN:
      localStorage.removeItem('token');
      return { ...state, token: null };

    case SET_USER_LEVEL:
      return {
        ...state,
        userLevel: action.payload,
      };
    case REMOVE_USER_LEVEL:
      return {
        ...state,
        userLevel: null,
      };

    case SET_FILTERED_LANGUAGES:
      return {
        ...state,
        filteredLanguages: action.payload,
      };
    case SET_YEAR_FILTER:
      const filteredByYear = state.languages.filter(
        (lang) =>
          lang.year >= action.payload.min && lang.year <= action.payload.max
      );
      return {
        ...state,
        filteredLanguages: filteredByYear,
      };
    case SET_TIOBE_FILTER:
      const filteredByTiobe = state.languages.filter(
        (lang) =>
          lang.tiobeRank >= action.payload.min &&
          lang.tiobeRank <= action.payload.max
      );
      return {
        ...state,
        filteredLanguages: filteredByTiobe,
      };

    default:
      return state;
  }
};

export default rootReducer;
