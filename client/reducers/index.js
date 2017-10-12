
/**
  rootReducer
*/

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import home from './homeReducer';
import auth from './auth_reducer';

export default combineReducers({
  auth,
  home,
  router: routerReducer,
});
