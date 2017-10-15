
const tokenHelper = () => {
  const that = {};
  function setTokens(token, access_token) {
    // removeTokens();
    console.log(' SETTING TOKENS!', token, 'ACCESS TOKEN ', access_token);
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('access_token');
    localStorage.setItem('jwt_token', token);
    localStorage.setItem('access_token', access_token);
  }
  function removeTokens() {
    console.log(' REMOVING TOKENS');

  }
  that.setTokens = setTokens;
  return that;
};

export default tokenHelper();
