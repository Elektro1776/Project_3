export const USER_TOKEN = 'USER_TOKEN';
export const USER_TOKEN_SUCCESS = 'USER_TOKEN_SUCCESS';
export const USER_TOKEN_FAILURE = 'USER_TOKEN_FAILURE';
export const USER_TOKEN_NOT_FOUND = 'USER_TOKEN_NOT_FOUND';

// const ROOT_URL = window.location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/auth' : '/auth';
// console.log(' ROOT URL ????', ROOT_URL);
import axios from 'axios';
import tokenHelper from '../../util/tokenHelper';
export const checkUserToken = ({ token, access_token }) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: `/auth/token?access_token=${access_token}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((user) => {
        console.info('CHECK USER TOKEN SUCCESSSSSSSSSS?', user);
        const { token: magicToken, access_token: access_token_magic, github_token: git_token } = user.data;
        tokenHelper.setTokens(magicToken, access_token_magic, git_token);
        dispatch(tokenCheckSuccess(user.data));
      })
      .catch((err, other) => {
        // console.info(' WE HAVE AN ERROR HUSTON', err.response);
        const { data } = err.response;
        console.log(' WHAT IS THE DATA?', data);
        dispatch(tokenCheckFailure(data));
      });
  };
};

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
