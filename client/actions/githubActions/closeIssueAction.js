export const CLOSING_ISSUE = 'CLOSING_ISSUE';
export const RECEIVED_CLOSING_ISSUE = 'RECEIVED_CLOSING_ISSUE';
export const FAILURE_CLOSING_ISSUE = 'FAILURE_CLOSING_ISSUE';



export const closeUserIssue = (userName, repoName, issueNum, token) => (dispatch) => {
  // console.log(' WHAT IS OUR stuff to send TO SEND?', userName, repoName, issueNum, token);
  dispatch(closeIssue());
  return fetch('api/github/closeIssue', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ id: userName, repoName, issueNum, token })
  })
    .then((response) => response.json())
    .then((issue) => {
      // console.log(' Do we get a payload back?????', issue);
      dispatch(receivedClosedIssue(issue));
    })
    .catch((err) => {
      // console.info(' WHAT IS OUR ERR RESPONSE', err.response);
      dispatch(failedCloseIssue(err));
    });
};
const closeIssue = () => ({
  type: CLOSING_ISSUE,
});

const receivedClosedIssue = (issue) => ({
  type: RECEIVED_CLOSING_ISSUE,
  payload: issue,
});

const failedCloseIssue = (err) => ({
  type: FAILURE_CLOSING_ISSUE,
  payload: err,
});
