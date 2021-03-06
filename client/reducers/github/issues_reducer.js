import { FETCHING_ISSUES, SUCCESS_GETTING_ISSUES, FAILURE_GETTING_ISSUES } from '../../actions/githubActions/getIssuesAction';
import { CLOSING_ISSUE, RECEIVED_CLOSING_ISSUE, FAILURE_CLOSING_ISSUE } from '../../actions/githubActions/closeIssueAction';
import { CREATING_ISSUE, RECEIVED_CREATED_ISSUE, FAILURE_CREATING_ISSUE } from '../../actions/githubActions/createIssueAction';
import { ADDING_ASSIGNEES, RECEIVED_ASSIGNEES, FAILURE_ADD_ASSIGNEES } from '../../actions/githubActions/addAssigneesAction';
import { REMOVING_ASSIGNEES, RECEIVED_REMOVED_ASSIGNEES, FAILURE_REMOVE_ASSIGNEES } from '../../actions/githubActions/removeAssigneesAction';

const initialState = {
  fetchingIssues: false,
  fetchedIssues: false,
  repoIssues: null,
  errorMessage: '',
  closingIssue: false,
  closedIssue: false,
  closedIssData: [],
  errorCloseMessage: '',
  creatingIssue: false,
  createdIssue: false,
  errorCreatingIssue: '',
  errorAddingAssignees: '',
  addingAssignees: false,
  modifiedIssue: null,
};
function updateItemInArray(array, issueId) {
  const updatedItems = array.filter((issue) => {
    // console.log(' WHAT ARE THE ISSUES IN MAP????', issue.number, issueId);
    if (issue.number !== issueId) {
      // Since we only want to update one item, preserve all others as they are now
      return issue;
    }
  });

  return updatedItems;
}
function updateItemInObj(old, newObj) {
  return Object.assign({}, old, newObj);
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
    case CREATING_ISSUE: {
      return Object.assign({}, state, { creatingIssue: true });
    }
    case RECEIVED_CREATED_ISSUE: {
      const oldState = state.repoIssues;
      // console.log('old State', oldState);
      const newState = oldState.concat(action.payload.createdIssue);
      // console.log('now new state', newState);
      return Object.assign({}, state, { repoIssues: newState, createdIssue: true });
    }
    case FAILURE_CREATING_ISSUE: {
      return Object.assign({}, state, { errorCreatingIssue: action.payload.err });
    }
    case ADDING_ASSIGNEES: {
      return Object.assign({}, state, { addingAssignees: true });
    }
    case RECEIVED_ASSIGNEES: {
      let oldState = state.repoIssues;
      oldState.map((issue, i) => {
        if (issue.number === action.payload.issueNum) {
            oldState[i] = action.payload.issue.modifiedIssue;
        }
      });
      return Object.assign({}, state, { repoIssues: oldState, modifiedIssue: action.payload.issue.modifiedIssue });
    }
    case FAILURE_ADD_ASSIGNEES: {
      return Object.assign({}, state, { errorAddingAssignees: action.payload.err });
    }
    case REMOVING_ASSIGNEES: {
      return Object.assign({}, state, { addingAssignees: true });
    }
    case RECEIVED_REMOVED_ASSIGNEES: {
      let oldState = state.repoIssues;
      oldState.map((issue, i) => {
        if (issue.number === action.payload.issueNum) {
            oldState[i] = action.payload.issue.modifiedIssue;
        }
      });
      return Object.assign({}, state, { repoIssues: oldState, modifiedIssue: action.payload.issue.modifiedIssue });
    }
    case FAILURE_REMOVE_ASSIGNEES: {
      return Object.assign({}, state, { errorAddingAssignees: action.payload.err });
    }
    default:
      return { ...state };
  }
}
