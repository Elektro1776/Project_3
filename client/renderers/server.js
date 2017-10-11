
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import { Route } from 'react-router-dom';
import createHistory from 'history/createMemoryHistory';
import { Provider } from 'react-redux';
import Routes from '../routes/Routes';
import createStore from '../createstore';

const routes = [
  '/',
  '/login',
  '/signup',
  '/dashboard',
  '/projects',
  '/settings',
  'profile',
  '/about',
];
function renderApp(url, store) {
  // console.info("We should be rendering the app???", url, window.location)
  const context = {};
  const ssr = () => {
    const match = routes.reduce((acc, route) => matchPath(url, route, { exact: true }) || acc, null);
    if (!match) {
      return;
    }
    return renderToString(
      <Provider store={store}>
        <StaticRouter location={url} context={context}>
          <Route render={({ location }) => (<Routes location={location} />)} />
        </StaticRouter>
      </Provider>,
    );
  };
  return ssr();
}
export const renderPage = function serveIt(req, res) {
  const history = createHistory();
  const store = createStore(history);
  // console.log(' WHAT IS OUR REQ URL??', req.url);
  // const assets = require('../../build/assets.json');
  // assets.manifest.text = fs.readFileSync(
  //   join(__dirname, '..', '..', 'build', basename(assets.manifest.js)),
  //   'utf-8'
  // );
  return renderApp(req.url, store);
};
export default renderPage;
