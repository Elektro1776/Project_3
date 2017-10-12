
/* eslint-disable no-undef */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';
import App from '../containers/ConnectedContainer';
import configureStore from '../createstore';

const history = createHistory();
const initalState = window.__INITALSTATE__;
// console.log(' THIS IS OUR CLIENT SIDE REHYDRATE STATE?', window.__INITALSTATE__);
// garbage collect the initalState
// then just go ahead and remove the script tag for shigrins.... :)
// delete window.__INITALSTATE__;
// document.getElementById('initalState').remove();
const store = configureStore(history, initalState);
const meow = store.getState();
// console.log(' WHAT IS THIS STORE STATE???? MEOWWWWWW', meow)
const root = document.getElementById('root');
const renderApp = (Component) =>
  render(
    <AppContainer>
      <Provider store={store}>
        <Component history={history} />
      </Provider>
    </AppContainer>,
    root,
  );
renderApp(App);

if (module.hot) {
  module.hot.accept('../containers/ConnectedContainer', () => {
    const NextApp = require('../containers/ConnectedContainer').default;
    renderApp(NextApp);
  });
}
