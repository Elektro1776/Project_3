import { GETTING_BRANCHES, RECEIVED_BRANCHES, FAILURE_GETTING_BRANCHES } from '../../actions/githubActions/getBranchesAction';

const initialState = {
  fetchingBranches: false,
  fetchedBranches: false,
  branches: [],
  errorMessage: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GETTING_BRANCHES:
      return Object.assign({}, state, { fetchingBranches: true });
    case RECEIVED_BRANCHES:{
      // console.info('What are the reducers Issues', action.payload, )
      return Object.assign({}, state, { branches: action.payload.branches, fetchedBranches: true });
    }
    case FAILURE_GETTING_BRANCHES:
      return Object.assign({}, state, { errorMessage: action.payload.err });
    default:
      return { ...state };
  }
}
