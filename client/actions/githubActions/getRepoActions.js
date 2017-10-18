import axios from 'axios';

export const FETCHING_REPOS = 'FETCHING_REPOS';
export const SUCCESS_GETTING_REPOS = 'SUCCESS_GETTING_REPOS';
export const FAILURE_GETTING_REPOS = 'FAILURE_GETTING_REPOS';

export const fetchUserRepos = (userId) => (dispatch) => {
  console.log(' WHAT IS OUR USER ID TO SEND?', userId);
  dispatch(fetchingRepos());
  return fetch('/api/github/getRepos', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ id: userId }),
  })
    .then((response) => response.json())
    .then((repos) => {
      dispatch(receivedRepos(repos));
    })
    .catch((err) => {
      console.info(' WHAT IS OUR ERR RESPONSE', err.response);
      dispatch(failedFetchRepos(err));
    });
};
const fetchingRepos = () => ({
  type: FETCHING_REPOS,
});

const receivedRepos = (repos) => ({
  type: SUCCESS_GETTING_REPOS,
  payload: repos,
});

const failedFetchRepos = (err) => ({
  type: FAILURE_GETTING_REPOS,
  payload: err,
});
