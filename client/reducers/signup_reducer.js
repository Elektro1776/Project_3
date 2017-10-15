import { SIGNING_IN_USER, SUCCESS_SIGNED_USER_IN, FAILURE_SIGNED_USER_IN } from '../actions/signupActions';

const initalState = {
  userSigningIn: false,
  username: '',
  userSignedUp: false,
  errorMessage: '',
};
export default function signUpUser(state = initalState, action) {
  switch (action.type) {
    case SIGNING_IN_USER:
      return Object.assign({}, state, { userSigningIn: true });
    case SUCCESS_SIGNED_USER_IN: {
      console.info(' WHAT IS OUR ACTION PAYLOAD', action.payload);
      return Object.assign({}, state, { username: action.payload.username, userSignedUp: true });
    }
    case FAILURE_SIGNED_USER_IN:
      return Object.assign({}, state, { errorMessage: action.payload.err });
    default:
      return { ...state };
  }
}
