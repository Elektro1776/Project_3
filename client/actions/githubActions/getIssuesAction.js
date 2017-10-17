export const FETCHING_ISSUES = 'FETCHING_ISSUES';
export const SUCCESS_GETTING_ISSUES = 'SUCCESS_GETTING_ISSUES';
export const FAILURE_GETTING_ISSUES = 'FAILURE_GETTING_ISSUES';

export const fetchUserIssues = (userId, repoName) => (dispatch) => {
  console.log(' WHAT IS OUR stuff to send TO SEND?', userId, repoName);
  dispatch(fetchingIssues());
  return fetch('/api/github/getIssues', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ id: userId, repoName }),
  })
    .then((response) => response.json())
    .then((issues) => {
      dispatch(receivedIssues(issues));
    })
    .catch((err) => {
      // console.info(' WHAT IS OUR ERR RESPONSE', err.response);
      dispatch(failedFetchIssues(err));
    });
};
const fetchingIssues = () => ({
  type: FETCHING_ISSUES,
});

const receivedIssues = (issues) => ({
  type: SUCCESS_GETTING_ISSUES,
  payload: issues,
});

const failedFetchIssues = (err) => ({
  type: FAILURE_GETTING_ISSUES,
  payload: err,
});
