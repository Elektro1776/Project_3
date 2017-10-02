
/**
  rootReducer
*/

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import home from './homeReducer';

export default combineReducers({
  home,
  router: routerReducer,
});
