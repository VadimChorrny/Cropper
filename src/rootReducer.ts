import { combineReducers } from 'redux';
import authReducer from './store/reducers/auth';

export default combineReducers({
  authReducer: authReducer,
});
