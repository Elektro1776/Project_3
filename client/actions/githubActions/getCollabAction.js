export const FETCHING_COLLABORATORS = 'FETCHING_COLLABORATORS';
export const SUCCESS_GETTING_COLLABORATORS = 'SUCCESS_GETTING_COLLABORATORS';
export const FAILURE_GETTING_COLLABORATORS = 'FAILURE_GETTING_COLLABORATORS';

export const fetchCollaborators = (userId, repoName, token) => (dispatch) => {
  dispatch(fetchingCollaborators());
  return fetch('/api/github/getCollaborators', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ id: userId, repoName, token }),
  })
    .then((response) => response.json())
    .then((collabs) => {
      dispatch(receivedCollaborators(collabs));
    })
    .catch((err) => {
      // console.info(' WHAT IS OUR ERR RESPONSE', err.response);
      dispatch(failedFetchCollaborators(err));
    });
};
const fetchingCollaborators = () => ({
  type: FETCHING_COLLABORATORS,
});

const receivedCollaborators = (collabs) => ({
  type: SUCCESS_GETTING_COLLABORATORS,
  payload: collabs,
});

const failedFetchCollaborators = (err) => ({
  type: FAILURE_GETTING_COLLABORATORS,
  payload: err,
});
