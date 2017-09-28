
/* eslint-disable no-undef */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader'
import createHistory from 'history/createBrowserHistory';
import App from '../containers/ConnectedContainer';
import createStore from '../createstore';

const history = createHistory();
const store = createStore(history);
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
