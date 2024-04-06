import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_LOADING,
  UNSET_LOADING,
} from './actions';

const initialState = {
  isAuthenticated: false,
  loading: true,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, isAuthenticated: true };
    case SET_UNAUTHENTICATED:
      return { ...state, isAuthenticated: false };
    case SET_LOADING:
      return { ...state, loading: true };
    case UNSET_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default rootReducer;
