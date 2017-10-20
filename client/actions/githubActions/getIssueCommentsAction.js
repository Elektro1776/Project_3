export const FETCHING_COMMENTS = 'FETCHING_COMMENTS';
export const SUCCESS_GETTING_COMMENTS = 'SUCCESS_GETTING_COMMENTS';
export const FAILURE_GETTING_COMMENTS = 'FAILURE_GETTING_COMMENTS';

export const fetchUserComments = (userId, repoName, issueNum, token) => (dispatch) => {
  // console.log(' WHAT IS OUR stuff to send TO SEND?', userId, repoName, issueNum, token);
  dispatch(fetchingComments());
  return fetch('/api/github/getIssueComments', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ id: userId, repoName, num: issueNum, token }),
  })
    .then((response) => response.json())
    .then((comments) => {
      dispatch(receivedComments(comments));
    })
    .catch((err) => {
      // console.info(' WHAT IS OUR ERR RESPONSE', err.response);
      dispatch(failedFetchComments(err));
    });
};
const fetchingComments = () => ({
  type: FETCHING_COMMENTS,
});

const receivedComments = (comments) => ({
  type: SUCCESS_GETTING_COMMENTS,
  payload: comments,
});

const failedFetchComments = (err) => ({
  type: FAILURE_GETTING_COMMENTS,
  payload: err,
});
