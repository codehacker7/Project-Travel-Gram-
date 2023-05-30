import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router/immutable';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export default function configureStore(history) {
  const loggerMiddleware = createLogger();
  let middleware = [ routerMiddleware(history), thunk ];

  if (process.env.NODE_ENV !== 'production') {
    middleware = [ ...middleware, loggerMiddleware ]
  }

  const enhancer = compose(applyMiddleware(...middleware));

  const store = createStore(
    rootReducer(history),
    enhancer
  );

  return store;
}
