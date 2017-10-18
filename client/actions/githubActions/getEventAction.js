export const FETCHING_EVENTS = 'FETCHING_EVENTS';
export const SUCCESS_GETTING_EVENTS = 'SUCCESS_GETTING_EVENTS';
export const FAILURE_GETTING_EVENTS = 'FAILURE_GETTING_EVENTS';

export const fetchUserEvents = (userId) => (dispatch) => {
  // console.log(' WHAT IS OUR stuff to send TO SEND?', userId, repoName);
  dispatch(fetchingEvents());
  return fetch('/api/github/getEvents', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ id: userId }),
  })
    .then((response) => response.json())
    .then((events) => {
      dispatch(receivedEvents(events));
    })
    .catch((err) => {
      // console.info(' WHAT IS OUR ERR RESPONSE', err.response);
      dispatch(failedFetchEvents(err));
    });
};
const fetchingEvents = () => ({
  type: FETCHING_EVENTS,
});

const receivedEvents = (events) => ({
  type: SUCCESS_GETTING_EVENTS,
  payload: events,
});

const failedFetchEvents = (err) => ({
  type: FAILURE_GETTING_EVENTS,
  payload: err,
});
