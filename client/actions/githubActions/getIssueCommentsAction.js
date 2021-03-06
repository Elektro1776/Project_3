export const FETCHING_COMMENTS = 'FETCHING_COMMENTS';
export const SUCCESS_GETTING_COMMENTS = 'SUCCESS_GETTING_COMMENTS';
export const FAILURE_GETTING_COMMENTS = 'FAILURE_GETTING_COMMENTS';

export const fetchUserComments = (userId, repoName, issueNum, token) => (dispatch) => {
  dispatch(fetchingComments());
  return fetch('/api/github/getIssueComments', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ id: userId, repoName, num: issueNum, token }),
  })
    .then((response) => response.json())
    .then((comment) => {
      dispatch(receivedComments(comment, issueNum));
    })
    .catch((err) => {
      // console.info(' WHAT IS OUR ERR RESPONSE', err.response);
      dispatch(failedFetchComments(err));
    });
};
const fetchingComments = () => ({
  type: FETCHING_COMMENTS,
});

const receivedComments = (comment, issueNum) => {
  // console.log(' WHAT IS OUR COMMENT RECIEVED', comment, issueNum);
  return {
    type: SUCCESS_GETTING_COMMENTS,
    payload: { ...comment, issueNum },
  }
};

const failedFetchComments = (err) => ({
  type: FAILURE_GETTING_COMMENTS,
  payload: err,
});
