import { USER_TOKEN, USER_TOKEN_SUCCESS, USER_TOKEN_FAILURE, USER_TOKEN_NOT_FOUND } from '../actions/authenticateUserActions';

const initalState = {
  isAuthenticated: false,
  username: '',
  loadingUser: false,
  mesage: '',
};

export default function (state = initalState, action) {
  switch (action.type) {
    case USER_TOKEN:
      return Object.assign({}, state, { loadingUser: true });
    case USER_TOKEN_SUCCESS: {
      console.log(' WHAT IS OUR PAYLOAD?'), action.payload;
      return Object.assign({}, state, { isAuthenticated: true, username: action.payload.username, loadingUser: false });
    }
    case USER_TOKEN_NOT_FOUND: {
      return Object.assign({}, state, { isAuthenticated: false, loadingUser: false });
    }
    case USER_TOKEN_FAILURE: {
      // console.log(' WHAT IS THE ERROR MESSAGE?', action.payload);
      return Object.assign({}, state, { isAuthenticated: false, loadingUser: false, message: action.payload.message });
    }
    default:
      return { ...state };
  }
}
