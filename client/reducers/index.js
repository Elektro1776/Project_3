
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
import issues from './github/issues_reducer';
import comments from './github/comments_reducer';
import collabs from './github/collab_reducer';
import readme from './github/readme_reducer';
import events from './github/event_reducer';

export default combineReducers({
  router: routerReducer,
  auth,
  home,
  signedUp,
  login,
  repos,
  issues,
  comments,
  collabs,
  readme,
  events,
});
