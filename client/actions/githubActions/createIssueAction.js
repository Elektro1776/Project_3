export const CREATING_ISSUE = 'CREATING_ISSUE';
export const RECEIVED_CREATED_ISSUE = 'RECEIVED_CREATED_ISSUE';
export const FAILURE_CREATING_ISSUE = 'FAILURE_CREATING_ISSUE';



export const createUserIssue = (userId, repoName, token, title, body, assignees) => (dispatch) => {
  console.log(' WHAT IS OUR stuff to send TO SEND?', userId, repoName, token, title, body, assignees);
  dispatch(creatingIssue());
  return fetch('api/github/createIssue', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ id: userId, repoName, token, title, body, assignees })
  })
    .then((response) => response.json())
    .then((issue) => {
      // console.log(' Do we get a payload back?????', issue);
      dispatch(receivedCreatedIssue(issue));
    })
    .catch((err) => {
      // console.info(' WHAT IS OUR ERR RESPONSE', err.response);
      dispatch(failedCreateIssue(err));
    });
};
const creatingIssue = () => ({
  type: CREATING_ISSUE,
});

const receivedCreatedIssue = (issue) => ({
  type: RECEIVED_CREATED_ISSUE,
  payload: issue,
});

const failedCreateIssue = (err) => ({
  type: FAILURE_CREATING_ISSUE,
  payload: err,
});
