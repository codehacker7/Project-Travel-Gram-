import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router';
import authReducer from './slices/authSlice';

const rootReducer = (history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer
  })
);

export default rootReducer;
