import { SET_TOKEN, REMOVE_TOKEN, SET_LOADING, UNSET_LOADING } from './actions';

const initialState = {
  token: null,
  loading: true,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case REMOVE_TOKEN:
      return {
        ...state,
        token: null,
      };
    case SET_LOADING:
      return { ...state, loading: true };
    case UNSET_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default rootReducer;
