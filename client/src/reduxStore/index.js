import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from './reducers';

const bindMiddleware = () => {
  const middlewares = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middlewares));
  }
  
  return applyMiddleware(...middlewares);
};

export const store = createStore(
  rootReducer,
  compose(
    bindMiddleware(),
    compose
  )
);