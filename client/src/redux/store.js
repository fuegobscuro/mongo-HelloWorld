import { createStore, compose } from 'redux';
import rootReducer from './reducer';

const enhancers = [];
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancers.push(
    window.__REDUX_DEVTOOLS_EXTENSION__({
      trace: true,
    })
  );
}

const composedEnhancers = compose(...enhancers);

const store = createStore(rootReducer, composedEnhancers);

export default store;
