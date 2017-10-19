import { FETCHING_ISSUES, SUCCESS_GETTING_ISSUES, FAILURE_GETTING_ISSUES } from '../../actions/githubActions/getIssuesAction';
import { CLOSING_ISSUE, RECEIVED_CLOSING_ISSUE, FAILURE_CLOSING_ISSUE } from '../../actions/githubActions/closeIssueAction';

const initialState = {
  fetchingIssues: false,
  fetchedIssues: false,
  repoIssues: [],
  errorMessage: '',
  closingIssue: false,
  closedIssue: false,
  closedIssData: [],
  errorCloseMessage: '',
};
function updateItemInArray(array, issueId) {
    const updatedItems = array.filter(issue => {
      console.log(' WHAT ARE THE ISSUES IN MAP????', issue.number, issueId);
        if(issue.number !== issueId) {
            // Since we only want to update one item, preserve all others as they are now
            return issue;
        }

        // Use the provided callback to create an updated item
        // const updatedItem = updateItemCallback(issue);
        // return updatedItem;
    });

    return updatedItems;
}
function updateObject(oldObject, newValues) {
    // Encapsulate the idea of passing a new object as the first parameter
    // to Object.assign to ensure we correctly copy data instead of mutating
    return Object.assign({}, oldObject, newValues);
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
      // console.log(newIssues, 'here are our new issues');
          //  return updateObject(state, {todos : newTodos});
      return Object.assign({}, state, { closedIssData: action.payload.issue, closedIssue: true, repoIssues: newIssues });
    }
    case FAILURE_CLOSING_ISSUE:
      return Object.assign({}, state, { errorCloseMessage: action.payload.err });
    default:
      return { ...state };
  }
}