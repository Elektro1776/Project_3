
export const meow = test => {
  console.log(' THIS ACTION FIRED!');
  return {
    type: 'TEST',
    test,
  };
};
