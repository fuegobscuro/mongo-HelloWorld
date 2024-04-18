import {
  FETCH_LANGUAGES_REQUEST,
  FETCH_LANGUAGES_SUCCESS,
  FETCH_LANGUAGES_FAILURE,
  CREATE_LANGUAGE,
  UPDATE_LANGUAGE,
  UPDATE_LANGUAGE_STATUS,
  DELETE_LANGUAGE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  CREATE_USER,
  UPDATE_USER,
  UPDATE_USER_STATUS,
  DELETE_USER,
  SET_TOKEN,
  REMOVE_TOKEN,
  SET_USER_ROLE,
  REMOVE_USER_ROLE,
} from './actions';

const initialState = {
  token: localStorage.getItem('token'),
  userRole: null,
  languages: [],
  users: [],
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
    case UPDATE_LANGUAGE_STATUS:
      return {
        ...state,
        languages: state.languages.map((lang) =>
          lang._id === action.payload.id
            ? { ...lang, isActive: action.payload.isActive }
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
    case UPDATE_USER_STATUS:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload.id
            ? { ...user, isActive: action.payload.isActive }
            : user
        ),
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };

    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case REMOVE_TOKEN:
      localStorage.removeItem('token'); // Also clear localStorage
      return { ...state, token: null };

    case SET_USER_ROLE:
      return {
        ...state,
        userRole: action.payload,
      };
    case REMOVE_USER_ROLE:
      return {
        ...state,
        userRole: null,
      };

    default:
      return state;
  }
};

export default rootReducer;
