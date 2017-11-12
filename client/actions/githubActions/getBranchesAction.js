// export const GETTING_BRANCHES = 'GETTING_BRANCHES';
// export const RECEIVED_BRANCHES = 'RECEIVED_BRANCHES';
// export const FAILURE_GETTING_BRANCHES = 'FAILURE_GETTING_BRANCHES';
//
//
//
// export const getRepoBranches = (userName, repoName, token) => (dispatch) => {
//   // console.log(' WHAT IS OUR stuff to send TO SEND?', userName, repoName, issueNum, token);
//   dispatch(gettingBranches());
//   return fetch('api/github/branches', {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json',
//     },
//     body: JSON.stringify({ id: userName, repoName, token })
//   })
//     .then((response) => response.json())
//     .then((issue) => {
//       // console.log(' Do we get a payload back?????', issue);
//       dispatch(receivedClosedIssue(issue));
//     })
//     .catch((err) => {
//       // console.info(' WHAT IS OUR ERR RESPONSE', err.response);
//       dispatch(failedCloseIssue(err));
//     });
// };
// const gettingBranches = () => ({
//   type: GETTING_BRANCHES,
// });
//
// const receivedBranches = (branches) => ({
//   type: RECEIVED_BRANCHES,
//   payload: branches,
// });
//
// const failedGettingBranches = (err) => ({
//   type: FAILURE_GETTING_BRANCHES,
//   payload: err,
// });
