import { USER_TOKEN, USER_TOKEN_SUCCESS, USER_TOKEN_FAILURE, USER_TOKEN_NOT_FOUND, GITHUB_PROFILE_SUCCESS, GITHUB_TOKEN_SUCCESS} from '../actions/authenticateUserActions';

const initalState = {
  isAuthenticated: false,
  username: '',
  loadingUser: false,
  githubAuthentication: false,
  github_token: undefined,
  mesage: '',
  git_profile: false
};

export default function (state = initalState, action) {
  switch (action.type) {
    case USER_TOKEN: {
      return Object.assign({}, state, { loadingUser: true });
    }
    case USER_TOKEN_SUCCESS: {
      // console.log("When does this fire off????", state)
      return Object.assign({}, state, { isAuthenticated: true, username: action.payload.username, loadingUser: false });
    }
    case USER_TOKEN_NOT_FOUND: {
      return Object.assign({}, state, { isAuthenticated: false, loadingUser: false });
    }
    case USER_TOKEN_FAILURE: {
      return Object.assign({}, state, { isAuthenticated: false, loadingUser: false, message: action.payload.message });
    }
    case GITHUB_TOKEN_SUCCESS: {
      // console.log(' GIT HUB TOKEN SUCCEESSSSS', state);
      return Object.assign({}, state, { githubAuthentication: true, github_token: action.payload.token });
    }
    case GITHUB_PROFILE_SUCCESS: {
      // console.log(' GIT HUB PROFILE SUCCESS!!!', action.payload, );
      return Object.assign({}, state, { git_profile: action.payload });
      // return state;
    }
    default:
      return { ...state };
  }
}
