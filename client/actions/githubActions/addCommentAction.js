export const ADDING_COMMENT = 'ADDING_COMMENT';
export const RECEIVED_COMMENT = 'RECEIVED_COMMENT';
export const FAILURE_ADD_COMMENT = 'FAILURE_ADD_COMMENT';



export const addUserComment = (userName, repoName, issueNum, body, token) => (dispatch) => {
  dispatch(addComment());
  return fetch('api/github/createIssueComment', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ id: userName, repoName, issueNum, comment: body, token })
  })
    .then((response) => response.json())
    .then((comment) => {
      dispatch(receivedNewComment(comment, issueNum));
    })
    .catch((err) => {
      // console.info(' WHAT IS OUR ERR RESPONSE', err.response);
      dispatch(failedAddComment(err));
    });
};
const addComment = () => ({
  type: ADDING_COMMENT,
});

const receivedNewComment = (comment, issueNum) => ({
  type: RECEIVED_COMMENT,
  payload: { comment, issueNum },
});

const failedAddComment = (err) => ({
  type: FAILURE_ADD_COMMENT,
  payload: err,
});
