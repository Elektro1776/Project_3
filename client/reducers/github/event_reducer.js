import { FETCHING_EVENTS, SUCCESS_GETTING_EVENTS, FAILURE_GETTING_EVENTS } from '../../actions/githubActions/getEventAction';

const initialState = {
  fetchingEvents: false,
  fetchedEvents: false,
  events: [],
  errorMessage: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCHING_EVENTS:
      return Object.assign({}, state, { fetchingEvents: true });
    case SUCCESS_GETTING_EVENTS:{
      // console.info('What are the reducers Issues', action.payload, )
      return Object.assign({}, state, { events: action.payload.events, fetchedEvents: true });
    }
    case FAILURE_GETTING_EVENTS:
      return Object.assign({}, state, { errorMessage: action.payload.err });
    default:
      return { ...state };
  }
}
