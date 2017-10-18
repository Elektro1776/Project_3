import { FETCHING_REPOS, SUCCESS_GETTING_REPOS, FAILURE_GETTING_REPOS } from '../../actions/githubActions/getRepoActions';

const initialState = {
  fetchingRepos: false,
  fetchedRepos: false,
  userRepos: [],
  errorMessage: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCHING_REPOS:
      return Object.assign({}, state, { fetchingRepos: true });
    case SUCCESS_GETTING_REPOS:{
      console.info('What are the reducers repos', action.payload, )
      return Object.assign({}, state, { userRepos: action.payload.repos, fetchedRepos: true });
    }
    case FAILURE_GETTING_REPOS:
      return Object.assign({}, state, { errorMessage: action.payload.err });
    default:
      return { ...state };
  }
}
