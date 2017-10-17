import { FETCHING_ISSUES, SUCCESS_GETTING_ISSUES, FAILURE_GETTING_ISSUES } from '../../actions/githubActions/getIssuesAction';

const initialState = {
  fetchingIssues: false,
  fetchedIssues: false,
  repoIssues: [],
  errorMessage: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCHING_ISSUES:
      return Object.assign({}, state, { fetchingIssues: true });
    case SUCCESS_GETTING_ISSUES:{
      // console.info('What are the reducers Issues', action.payload, )
      return Object.assign({}, state, { repoIssues: action.payload.issues, fetchedIssues: true });
    }
    case FAILURE_GETTING_ISSUES:
      return Object.assign({}, state, { errorMessage: action.payload.err });
    default:
      return { ...state };
  }
}
