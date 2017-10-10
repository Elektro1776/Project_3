export const signupUser = (userData) => {
  return (dispatch) => {
    dispatch(singingUserIn());
    return fetch('/signup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      // .then((result) => result.json())
      .then((user) => {
        console.log(' WHAT IS OUR USER ????', user);
        dispatch(successUserSignIn(user))
      })
      .catch((err) => {
        // console.log(' Do we hit an errr::???', err);
        dispatch(failureUserSignIn(err));
      });
  };
};
const singingUserIn = () => {
  console.info(' SIGNING IN USER !');
  return {
    type: 'SIGNING_IN_USER',
  };
};

const successUserSignIn = (user) => {
  console.info('Success signed user in', user);
  return {
    type: 'SUCCESS_SIGNED_USER_IN',
  };
};

const failureUserSignIn = (err) => {
  console.info(' FAILED TO SIGN USER UP', err);
  return {
    type: 'FAILURE_SIGNED_USER_IN',
  };
};
