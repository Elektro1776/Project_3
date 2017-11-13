export const REMOVING_ASSIGNEES = 'REMOVING_ASSIGNEES';
export const RECEIVED_REMOVED_ASSIGNEES = 'RECEIVED_REMOVED_ASSIGNEES';
export const FAILURE_REMOVE_ASSIGNEES = 'FAILURE_REMOVE_ASSIGNEES';

export const removeNewAssignees = (userName, repoName, issueNum, assignees, token) => (dispatch) => {
  dispatch(removeAssignees());
  return fetch('api/github/removeAssignees', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ id: userName, repoName, issueNum, assignees, token })
  })
    .then((response) => response.json())
    .then((issue) => {
      dispatch(receivedRemovedAssignees(issue, issueNum));
    })
    .catch((err) => {
      // console.info(' WHAT IS OUR ERR RESPONSE', err.response);
      dispatch(failedRemoveAssignees(err));
    });
};
const removeAssignees = () => ({
  type: REMOVING_ASSIGNEES,
});

const receivedRemovedAssignees = (issue, issueNum) => ({
  type: RECEIVED_REMOVED_ASSIGNEES,
  payload: { issue, issueNum },
});

const failedRemoveAssignees = (err) => ({
  type: FAILURE_REMOVE_ASSIGNEES,
  payload: err,
});
