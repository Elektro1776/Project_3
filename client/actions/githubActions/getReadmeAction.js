export const FETCHING_README = 'FETCHING_README';
export const SUCCESS_GETTING_README = 'SUCCESS_GETTING_README';
export const FAILURE_GETTING_README = 'FAILURE_GETTING_README';

export const fetchUserReadme = (userId, repoName, token) => (dispatch) => {
  // console.log(' WHAT IS OUR stuff to send TO SEND for READ MEEEE?', userId, repoName, token);
  dispatch(fetchingReadme());
  return fetch('/api/github/readme', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ id: userId, repoName, token }),
  })
    .then((response) => response.json())
    .then((readme) => {
      dispatch(receivedReadme(readme));
    })
    .catch((err) => {
      // console.info(' WHAT IS OUR ERR RESPONSE', err.response);
      dispatch(failedFetchReadme(err));
    });
};
const fetchingReadme = () => ({
  type: FETCHING_README,
});

const receivedReadme = (readme) => ({
  type: SUCCESS_GETTING_README,
  payload: readme,
});

const failedFetchReadme = (err) => ({
  type: FAILURE_GETTING_README,
  payload: err,
});
