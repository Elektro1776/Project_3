import { USER_TOKEN, USER_TOKEN_SUCCESS, USER_TOKEN_FAILURE, USER_TOKEN_NOT_FOUND } from '../actions/authenticateUserActions';
const initalState = {
  isAuthenticated: false,
  username: '',
  loadingUser: false,
};

export default function (state = initalState, action) {
  switch (action.type) {
    case USER_TOKEN:
      return Object.assign({}, state, { loadingUser: true });
    case USER_TOKEN_SUCCESS: {
      // console.log(' WE HAVE A USER TOKEN!!!!', action.payload.username);
      return Object.assign({}, state, { isAuthenticated: true, username: action.payload.username, loadingUser: false });
    }
    case USER_TOKEN_NOT_FOUND: {
      console.log(' USER TOKEN NOT FOUND');
      return Object.assign({}, state, { isAuthenticated: false, loadingUser: false });
    }
    default:
      return state;
  }
}
