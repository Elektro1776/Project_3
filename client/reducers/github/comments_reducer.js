import { FETCHING_COMMENTS, SUCCESS_GETTING_COMMENTS, FAILURE_GETTING_COMMENTS } from '../../actions/githubActions/getIssueCommentsAction';
import { ADDING_COMMENT, RECEIVED_COMMENT, FAILURE_ADD_COMMENT } from '../../actions/githubActions/addCommentAction';

const initialState = {
  fetchingComments: false,
  fetchedComments: false,
  issueComments: [],
  errorMessage: '',
  fetchingNewComment: false,
  fetchedNewComment: false,
  newComment: [],
  errorCommMessage: ','
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCHING_COMMENTS:
      return Object.assign({}, state, { fetchingComments: true });
    case SUCCESS_GETTING_COMMENTS:{
      // console.info('What are the reducers Comments', action.payload, )
      return Object.assign({}, state, { issueComments: state.issueComments.push(action.payload.comments), fetchedComments: true });
    }
    case FAILURE_GETTING_COMMENTS:{
      return Object.assign({}, state, { errorMessage: action.payload.err });
    }
      case ADDING_COMMENT:{
        return Object.assign({}, state, { fetchingComments: true });
      }
      case RECEIVED_COMMENT:{
        // console.info('What are the reducers Comments', action.payload, )
        // const newState = state.issueComments.push(action.payload.comment);
        // return Object.assign({}, state, { newComment: comment issueComments: newState, fetchedNewComment: true });
        return Object.assign({}, state, { newComment: comment, fetchedNewComment: true });
      }
      case FAILURE_ADD_COMMENT:{
        return Object.assign({}, state, { errorCommMessage: action.payload.err });
      }
    default:
      return { ...state };
  }
}
