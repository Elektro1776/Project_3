import { FETCHING_COLLABORATORS, SUCCESS_GETTING_COLLABORATORS, FAILURE_GETTING_COLLABORATORS } from '../../actions/githubActions/getCollabAction';

const initialState = {
  fetchingCollaborators: false,
  fetchedCollaborators: false,
  collabs: [],
  errorMessage: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCHING_COLLABORATORS:
      return Object.assign({}, state, { fetchingCollaborators: true });
    case SUCCESS_GETTING_COLLABORATORS:{
      // console.info('What are the reducers Issues', action.payload, )
      return Object.assign({}, state, { collabs: action.payload.collabs, fetchedCollaborators: true });
    }
    case FAILURE_GETTING_COLLABORATORS:
      return Object.assign({}, state, { errorMessage: action.payload.err });
    default:
      return { ...state };
  }
}
