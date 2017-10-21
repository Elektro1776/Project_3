export const USER_TOKEN = 'USER_TOKEN';
export const USER_TOKEN_SUCCESS = 'USER_TOKEN_SUCCESS';
export const USER_TOKEN_FAILURE = 'USER_TOKEN_FAILURE';
export const USER_TOKEN_NOT_FOUND = 'USER_TOKEN_NOT_FOUND';
export const GITHUB_TOKEN_SUCCESS = 'GITHUB_TOKEN_SUCCESS';
export const GITHUB_PROFILE_SUCCESS = 'GITHUB_PROFILE_SUCCESS';
// const ROOT_URL = window.location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/auth' : '/auth';
// console.log(' ROOT URL ????', ROOT_URL);
import axios from 'axios';
import tokenHelper from '../../util/tokenHelper';

export const checkUserToken = ({ token, access_token, github_token }) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: `/auth/token?access_token=${access_token}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((user) => {
        const { token: magicToken, access_token: access_token_magic, github_token: git_token, git_profile } = user.data;
        tokenHelper.setTokens(magicToken, access_token_magic, git_token);
        if (git_token || github_token) {
          dispatch(githubTokenSuccess(git_token || github_token));
          if (git_profile) {
            console.log(' DO WE GET A GIT PROFILE???', git_profile);
            dispatch(githubProfileInfo(git_profile));
          }
        }
        dispatch(tokenCheckSuccess(user.data, git_token));
      })
      .catch((err, other) => {
        // console.info(' WE HAVE AN ERROR HUSTON', err.response);
        const { data } = err.response;
        // console.log(' WHAT IS THE DATA?', data);
        dispatch(tokenCheckFailure(data));
      });
  };
};
export const githubProfileInfo = (git_profile) => (
  {
    type: GITHUB_PROFILE_SUCCESS,
    payload: git_profile,
  }
);
export const githubTokenSuccess = (git_token) => (
  {
    type: GITHUB_TOKEN_SUCCESS,
    payload: { token: git_token },
  }
);
export const tokenCheckSuccess = (currentUser) => (
  {
    type: USER_TOKEN_SUCCESS,
    payload: currentUser,
  }
);

export const tokenCheckFailure = (error) => (
  {
    type: USER_TOKEN_FAILURE,
    payload: error,
  }
);

export const userTokenNotFound = () => {
  return {
    type: USER_TOKEN_NOT_FOUND,
  }
};
