import { FETCHING_COMMENTS, SUCCESS_GETTING_COMMENTS, FAILURE_GETTING_COMMENTS } from '../../actions/githubActions/getIssueCommentsAction';
import { ADDING_COMMENT, RECEIVED_COMMENT, FAILURE_ADD_COMMENT } from '../../actions/githubActions/addCommentAction';

const initialState = {
  fetchingComments: false,
  fetchedComments: false,
  issueComments: {},
  errorMessage: '',
  fetchingNewComment: false,
  fetchedNewComment: false,
  newComment: [],
  errorCommMessage: ',',
};

function updateItemInObj(old, newObj) {
  return Object.assign({}, old, newObj);
}
function updateSpecificCommentArray(old, newObj, key) {
  const specificArrayToModify = old[key];
  const updatedArray= specificArrayToModify.concat(newObj);
  return updatedArray;
}
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCHING_COMMENTS:
      return Object.assign({}, state, { fetchingComments: true, issueComments: {} });
    case SUCCESS_GETTING_COMMENTS: {
      // console.log(' WHAT IS OUR PAYLOAD', action.payload);
      const { comment, issueNum } = action.payload;
      const updatedObj = updateItemInObj(state.issueComments, { [issueNum]: comment });
      const finalIssues = updateItemInObj(state, { issueComments: updatedObj });
      // console.log('test object &&&&&&&&', updatedObj);
      // console.log(' WHAT IS OUR FINAL OBJ', finalIssues);
      // console.log(' WHAT IS STATE AS WE GO???', state);
      return finalIssues;
    }
    case FAILURE_GETTING_COMMENTS: {
      return Object.assign({}, state, { errorMessage: action.payload.err });
    }
    case ADDING_COMMENT: {
      return Object.assign({}, state, { fetchingComments: true });
    }
    case RECEIVED_COMMENT: {
      const { comment, issueNum } = action.payload;
      const updatedObj = updateSpecificCommentArray(state.issueComments, comment.newComment, issueNum);
      // console.log('WHAT IS UPDATED OBJ IN REDUCER', updatedObj);
      const updatedIssueCommentState = updateItemInObj(state.issueComments, {[issueNum]:updatedObj});
      // console.log('updated isue comment state',updatedIssueCommentState);
      const finalIssues = updateItemInObj(state, { issueComments: updatedIssueCommentState, fetchedNewComment: true, newComment: comment });
      // console.log('test object &&&&&&&&', updatedObj);
      // console.log(' WHAT IS OUR FINAL STATE', finalIssues);
      // console.log(' WHAT IS STATE AS WE GO???', state);
      return finalIssues;

    }
    case FAILURE_ADD_COMMENT: {
      return Object.assign({}, state, { errorCommMessage: action.payload.err });
    }
    default:
      return { ...state };
  }
}
