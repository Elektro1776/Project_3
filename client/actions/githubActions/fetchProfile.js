export const FETCHING_GIT_USER_PROFILE = 'FETCHING_GIT_USER_PROFILE';
export const SUCCESS_FETCH_GIT_PROFILE = 'SUCCESS_FETCH_GIT_PROFILE';
export const FAILURE_FETCH_GIT_PROFILE = 'FAILURE_FETCH_GIT_PROFILE';
export const GITHUB_PROFILE_SUCCESS = 'GITHUB_PROFILE_SUCCESS';


export const fetchGitProfile = (user_token) => (dispatch) => {
  // console.log(' FETCH GIT PROIFILE FIREEEE', user_token);
  dispatch(fetchingGitProfile());
  return fetch('/api/github/user_profile', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ token: user_token }),
  })
  .then((response) => response.json())
  .then((profile) => {
    // console.log(' WE HAVE A PROFILE!!!', profile);
    dispatch(recievedGitProfile(profile))
  })
  .catch((err) => {
    // console.log('ERR GETTING GIT PROFILE', err);
  })
};

export const fetchingGitProfile = () => ({
  type: FETCHING_GIT_USER_PROFILE,
});
export const recievedGitProfile = (profile) => ({
  type: GITHUB_PROFILE_SUCCESS,
  payload: profile,
});
