export const USER_TOKEN = 'USER_TOKEN';
export const USER_TOKEN_SUCCESS = 'USER_TOKEN_SUCCESS';
export const USER_TOKEN_FAILURE = 'USER_TOKEN_FAILURE';

// const ROOT_URL = window.location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

import axios from 'axios';


export const checkUserToken = (tokenFromStorage) => {
  console.log('IS THIS FIRING ?', );
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/me/from/token?token=${tokenFromStorage}`,
    headers: {
      Authorization: `Bearer ${tokenFromStorage}`,
    },
  });

  return {
    type: USER_TOKEN,
    payload: request,
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
