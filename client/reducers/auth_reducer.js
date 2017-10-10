import { USER_TOKEN, USER_TOKEN_SUCCESS, USER_TOKEN_FAILURE } from '../actions/authenticateUserActions';
const initalState = {
  isAuthenticated: false,
  username: '',
};

export default function (state = initalState, action) {
  switch (action.type) {
    case USER_TOKEN:
        return Object.assign({}, state, {})
    default:
      return state;
  }
}
