import { FETCHING_README, SUCCESS_GETTING_README, FAILURE_GETTING_README } from '../../actions/githubActions/getReadmeAction';

const initialState = {
  fetchingReadme: false,
  fetchedReadme: false,
  readme: [],
  errorMessage: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCHING_README:
      return Object.assign({}, state, { fetchingReadme: true });
    case SUCCESS_GETTING_README:{
      // console.info('What are the reducers Issues', action.payload, )
      return Object.assign({}, state, { readme: action.payload.readme, fetchedReadme: true });
    }
    case FAILURE_GETTING_README:
      return Object.assign({}, state, { errorMessage: action.payload.err });
    default:
      return { ...state };
  }
}
