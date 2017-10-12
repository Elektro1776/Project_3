
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import { Route } from 'react-router-dom';
import createHistory from 'history/createMemoryHistory';
import { Provider } from 'react-redux';
import Routes from '../routes/Routes';
import configureServerStore from '../createServerstore';

const routes = [
  {
    path: '/',
    exact: true,
    strict: false,
  },
  {
    path: '/login',
    exact: true,
    strict: false,
  },
  {
    path: '/signup',
    exact: true,
    strict: false,
  },
  {
    path: '/dashboard',
    exact: true,
    strict: false,
  },
  {
    path: '/projects',
    exact: true,
    strict: false,
  },
  {
    path: '/settings',
    exact: true,
    strict: false,
  },
  {
    path: '/profile',
    exact: true,
    strict: false,
  },
  {
    path: '/about',
    exact: true,
    strict: false,
  },
];
let counter = 0;

function renderApp(url, req) {
  // console.info("We should be rendering the app???", url, window.location)
  const context = {};
  const history = createHistory();
  const initalServerState = {};
  const ssr = () => {
    const store = configureServerStore(history, initalServerState);
    if (req.user) {
      store.dispatch({
        type: 'USER_TOKEN_SUCCESS',
        payload: req.user,
      });
    }
    const initalContent = renderToString(
      <Provider store={store}>
        <StaticRouter location={url} context={context}>
          <Route render={({ location }) => (<Routes location={location} />)} />
        </StaticRouter>
      </Provider>,
    );
    const initalState = store.getState();
    return {
      initalContent,
      initalState,
    };
  };
  return ssr();
}
export const renderPage = function serveIt(req, res) {
  const match = routes.reduce((acc, route) => {
    const realMatch = matchPath(req.url, route);
    return realMatch || acc;
  }, { path: '/', exact: true });
  // console.log(' DO WE MAKE IT PAST OUR MATCH CHECK', match);
  // console.log(' WHAT IS OUR REQ URL??', req.url);
  // const assets = require('../../build/assets.json');
  // assets.manifest.text = fs.readFileSync(
  //   join(__dirname, '..', '..', 'build', basename(assets.manifest.js)),
  //   'utf-8'
  // );
  if (match !== null) {
    return renderApp(match, req);
  }
};
export default renderPage;
