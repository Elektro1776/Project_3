const initalState = {
  singingUserIn: false,
};
export default function signUpUser(state = initalState, action) {
  switch (action.type) {
    case 'SIGNING_IN_USER':
      return Object.assign({}, state, { singingUserIn: true });
    default:
      return state;
  }
}
