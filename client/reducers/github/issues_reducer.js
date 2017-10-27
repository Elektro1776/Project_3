import { FETCHING_ISSUES, SUCCESS_GETTING_ISSUES, FAILURE_GETTING_ISSUES } from '../../actions/githubActions/getIssuesAction';
import { CLOSING_ISSUE, RECEIVED_CLOSING_ISSUE, FAILURE_CLOSING_ISSUE } from '../../actions/githubActions/closeIssueAction';

const initialState = {
  fetchingIssues: false,
  fetchedIssues: false,
  repoIssues: null,
  errorMessage: '',
  closingIssue: false,
  closedIssue: false,
  closedIssData: [],
  errorCloseMessage: '',
};
function updateItemInArray(array, issueId) {
    const updatedItems = array.filter(issue => {
      // console.log(' WHAT ARE THE ISSUES IN MAP????', issue.number, issueId);
        if(issue.number !== issueId) {
            // Since we only want to update one item, preserve all others as they are now
            return issue;
        }
    });

    return updatedItems;
}
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCHING_ISSUES:
      return Object.assign({}, state, { fetchingIssues: true });
    case SUCCESS_GETTING_ISSUES: {
      // console.info('What are the reducers Issues', action.payload, )
      return Object.assign({}, state, { repoIssues: action.payload.issues, fetchedIssues: true });
    }
    case FAILURE_GETTING_ISSUES:
      return Object.assign({}, state, { errorMessage: action.payload.err });
    case CLOSING_ISSUE:
      return Object.assign({}, state, { closingIssue: true });
    case RECEIVED_CLOSING_ISSUE: {
      // console.info('What is the Closed Issue', action.payload.closedIssue.number, )
      const id = action.payload.closedIssue.number;
      const newIssues = updateItemInArray(state.repoIssues, id);
      // console.log("PREV STATE", state.repoIssues);
      // console.log(newIssues, 'here are our new issues');
      return Object.assign({}, state, { closedIssData: action.payload.issue, closedIssue: true, repoIssues: newIssues });
    }
    case FAILURE_CLOSING_ISSUE:
      return Object.assign({}, state, { errorCloseMessage: action.payload.err });
    default:
      return { ...state };
  }
}
