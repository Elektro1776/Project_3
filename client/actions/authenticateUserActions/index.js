const USER_TOKEN = 'USER_TOKEN';
const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

import axios from 'axios';


export const checkForToken = (tokenFromStorage) => {
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
