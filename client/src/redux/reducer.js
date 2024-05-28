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
  SET_SORT_ORDER,
  SET_YEAR_FILTER,
  SET_TIOBE_FILTER,
  SET_SEARCH_QUERY,
  SET_CURRENT_PAGE,
} from './actions';

const initialState = {
  token: localStorage.getItem('token'),
  userLevel: null,
  languages: [],
  visibleLanguages: [],
  users: [],
  contactMessages: [],
  error: '',
  sortOrder: 'TIOBE Ranking',
  filters: {
    year: { min: null, max: null },
    tiobe: { min: null, max: null },
  },
  searchQuery: '',
  currentPage: 1,
};

function applyFiltersAndSort(languages, filters, searchQuery, sortOrder) {
  return languages
    .filter(
      (lang) =>
        lang.year >= filters.year.min &&
        lang.year <= filters.year.max &&
        lang.tiobeRank >= filters.tiobe.min &&
        lang.tiobeRank <= filters.tiobe.max &&
        lang.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOrder) {
        case 'A-Z':
          return a.name.localeCompare(b.name);
        case 'Z-A':
          return b.name.localeCompare(a.name);
        case 'Newest':
          return b.year - a.year;
        case 'Oldest':
          return a.year - b.year;
        case 'TIOBE Ranking':
          return a.tiobeRank - b.tiobeRank;
        default:
          return 0;
      }
    });
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LANGUAGES_REQUEST:
      return {
        ...state,
      };

    case FETCH_LANGUAGES_SUCCESS:
      const years = action.payload.map((lang) => lang.year);
      const tiobeRanks = action.payload
        .map((lang) => lang.tiobeRank)
        .filter(Boolean);
      const newFilters = {
        year: { min: Math.min(...years), max: Math.max(...years) },
        tiobe: { min: Math.min(...tiobeRanks), max: Math.max(...tiobeRanks) },
      };
      return {
        ...state,
        languages: action.payload,
        filters: newFilters,
        visibleLanguages: applyFiltersAndSort(
          action.payload,
          newFilters,
          state.searchQuery,
          state.sortOrder
        ),
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
        visibleLanguages: [action.payload, ...state.visibleLanguages],
      };

    case UPDATE_LANGUAGE:
      const updatedLanguages = state.languages.map((lang) =>
        lang._id === action.payload.id
          ? { ...lang, ...action.payload.languageData }
          : lang
      );
      return {
        ...state,
        languages: updatedLanguages,
        visibleLanguages: applyFiltersAndSort(
          updatedLanguages,
          state.filters,
          state.searchQuery,
          state.sortOrder
        ),
      };

    case DELETE_LANGUAGE:
      const updatedLanguagesAfterDelete =
        action.type === DELETE_LANGUAGE
          ? state.languages.filter((lang) => lang._id !== action.payload)
          : [...state.languages, action.payload];
      return {
        ...state,
        languages: updatedLanguagesAfterDelete,
        visibleLanguages: applyFiltersAndSort(
          updatedLanguagesAfterDelete,
          state.filters,
          state.searchQuery,
          state.sortOrder
        ),
        currentPage: 1,
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

    case SET_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.payload,
        visibleLanguages: applyFiltersAndSort(
          state.languages,
          state.filters,
          state.searchQuery,
          state.sortOrder
        ),
        currentPage: 1,
      };

    case SET_YEAR_FILTER:
      const newYearFilters = {
        ...state.filters,
        year: { min: action.payload.min, max: action.payload.max },
      };
      return {
        ...state,
        filters: newYearFilters,
        visibleLanguages: applyFiltersAndSort(
          state.languages,
          newYearFilters,
          state.searchQuery,
          state.sortOrder
        ),
        currentPage: 1,
      };
    case SET_TIOBE_FILTER:
      const newTiobeFilters = {
        ...state.filters,
        tiobe: { min: action.payload.min, max: action.payload.max },
      };
      return {
        ...state,
        filters: newTiobeFilters,
        visibleLanguages: applyFiltersAndSort(
          state.languages,
          newTiobeFilters,
          state.searchQuery,
          state.sortOrder
        ),
        currentPage: 1,
      };

    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
        visibleLanguages: applyFiltersAndSort(
          state.languages,
          state.filters,
          action.payload,
          state.sortOrder
        ),
        currentPage: 1,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
