
/**
  rootReducer
*/

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import home from './homeReducer';
import auth from './auth_reducer';
import signedUp from './signup_reducer';
import login from './login_reducer';
import repos from './github/repos_reducer';

export default combineReducers({
  router: routerReducer,
  auth,
  home,
  signedUp,
  login,
  repos,
});
