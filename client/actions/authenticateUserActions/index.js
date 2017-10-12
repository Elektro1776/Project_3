export const USER_TOKEN = 'USER_TOKEN';
export const USER_TOKEN_SUCCESS = 'USER_TOKEN_SUCCESS';
export const USER_TOKEN_FAILURE = 'USER_TOKEN_FAILURE';
export const USER_TOKEN_NOT_FOUND = 'USER_TOKEN_NOT_FOUND';

// const ROOT_URL = window.location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/auth' : '/auth';
// console.log(' ROOT URL ????', ROOT_URL);
import axios from 'axios';


export const checkUserToken = (tokenFromStorage) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: `/auth/token`,
      headers: {
        Authorization: `Bearer ${tokenFromStorage}`,
      },
    })
      .then((user) => {
        console.info('IS THIS FIRING ?', user.data);
        dispatch(tokenCheckSuccess(user.data))
      })
      .catch((err) => {
        console.info(' WE HAVE AN ERROR HUSTON', err);
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
