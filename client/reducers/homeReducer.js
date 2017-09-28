const initalState = {
  testState: 'Testing!!!!'
}
function homeReducer(state = initalState, action) {
  switch (action.type) {
    case 'TEST':
      return Object.assign({}, state, { test: action.test });
    default:
      return state;
  }
}

export default homeReducer;
