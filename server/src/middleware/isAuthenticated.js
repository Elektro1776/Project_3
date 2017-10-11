let inc = 0;
export const isAuthenticated = (req, res, next) => {
  inc += 1;
  console.info(' WHAT ARE THE KEYS ON SESSION???', req.path);
  // console.info("Are we authenticated?", req.session);
  // if (req.session || req.path === '/about') {
  //   console.log(' WHAT IS THE REQ.SESSION.USER', req.session);
  //   res.redirect('/about');
  // } else {
  //   return res.redirect('/about');
  // }
  return res.redirect('/about');

  // next()
};
