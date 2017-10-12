
export const meow = (test) => {
  console.info(' THIS ACTION FIRED!');
  return {
    type: 'TEST',
    test,
  };
};
