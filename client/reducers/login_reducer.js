import { LOGGING_USER_IN, SUCCESS_LOGGED_IN_USER, FAILURE_LOGGED_IN_USER } from '../actions/loginActions';

const initalState = {
  loggingUserIn: false,
  loggedInUser: false,
  errorMessage: '',
};
export default function (state = initalState, action) {
  switch (action.type) {
    case LOGGING_USER_IN:
      return Object.assign({}, state, { loggingUserIn: true });
    case SUCCESS_LOGGED_IN_USER:
      return Object.assign({}, state, { loggedInUser: true });
    case FAILURE_LOGGED_IN_USER:
      return Object.assign({}, state, { errorMessage: action.payload.message });
    default:
      return { ...state };
  }
}
