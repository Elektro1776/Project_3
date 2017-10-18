import { FETCHING_COMMENTS, SUCCESS_GETTING_COMMENTS, FAILURE_GETTING_COMMENTS } from '../../actions/githubActions/getIssueCommentsAction';

const initialState = {
  fetchingComments: false,
  fetchedComments: false,
  issueComments: [],
  errorMessage: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCHING_COMMENTS:
      return Object.assign({}, state, { fetchingComments: true });
    case SUCCESS_GETTING_COMMENTS:{
      // console.info('What are the reducers Comments', action.payload, )
      return Object.assign({}, state, { issueComments: action.payload.comments, fetchedComments: true });
    }
    case FAILURE_GETTING_COMMENTS:
      return Object.assign({}, state, { errorMessage: action.payload.err });
    default:
      return { ...state };
  }
}
