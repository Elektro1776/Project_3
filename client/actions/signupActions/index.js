import { tokenCheckSuccess } from '../authenticateUserActions';

export const SIGNING_IN_USER = 'SIGNING_IN_USER';
export const SUCCESS_SIGNED_USER_IN = 'SUCCESS_SIGNED_USER_IN';
export const FAILURE_SIGNED_USER_IN = 'FAILURE_SIGNED_USER_IN';

export const signupUser = (userData) => (dispatch) => {
  dispatch(singingUserIn());
  return fetch('/signup', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response;
    })
    .then((result) => result.json())
    .then((user) => {
      // console.info(' WHAT IS OUR USER ????', user);
      if (user.token) {
        localStorage.setItem('jwt_token', user.token);
        localStorage.setItem('access_token', user.access_token);
      }
      dispatch(successUserSignIn(user));
      dispatch(tokenCheckSuccess(user));
    })
    .catch((err) => {
      // console.log(' Do we hit an errr::???', err);
      dispatch(failureUserSignIn(err));
    });
};
// };
const singingUserIn = () => {
  return {
    type: SIGNING_IN_USER,
  };
};

const successUserSignIn = (user) => {
  return {
    type: SUCCESS_SIGNED_USER_IN,
    payload: user,
  };
};

const failureUserSignIn = (err) => {
  return {
    type: FAILURE_SIGNED_USER_IN,
    payload: err,
  };
};
