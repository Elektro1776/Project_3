export const ADDING_ASSIGNEES = 'ADDING_ASSIGNEES';
export const RECEIVED_ASSIGNEES = 'RECEIVED_ASSIGNEES';
export const FAILURE_ADD_ASSIGNEES = 'FAILURE_ADD_ASSIGNEES';

export const addNewAssignees = (userName, repoName, issueNum, assignees, token) => (dispatch) => {
  dispatch(addAssignees());
  return fetch('api/github/addAssignees', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ id: userName, repoName, issueNum, assignees, token })
  })
    .then((response) => response.json())
    .then((issue) => {
      dispatch(receivedAssignees(issue, issueNum));
    })
    .catch((err) => {
      // console.info(' WHAT IS OUR ERR RESPONSE', err.response);
      dispatch(failedAddAssignees(err));
    });
};
const addAssignees = () => ({
  type: ADDING_ASSIGNEES,
});

const receivedAssignees = (issue, issueNum) => ({
  type: RECEIVED_ASSIGNEES,
  payload: { issue, issueNum },
});

const failedAddAssignees = (err) => ({
  type: FAILURE_ADD_ASSIGNEES,
  payload: err,
});
