import { createStore } from 'redux';
import rootReducer from './reducer';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // This enables the Redux DevTools extension
);

export default store;
