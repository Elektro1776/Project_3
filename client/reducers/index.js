
/**
  rootReducer
*/

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import home from './homeReducer';
import auth from './auth_reducer';
import signedUp from './signup_reducer';
import login from './login_reducer';

export default combineReducers({
  auth,
  home,
  signedUp,
  login,
  router: routerReducer,
});
