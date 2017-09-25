
/* eslint-disable no-undef */

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader'
import App from './components/App';
import createStore from './createstore';

const store = createStore();
const renderApp = (Component) =>
  render(
    <AppContainer>
        <Component />
    </AppContainer>,
    document.getElementById("root"),
);
renderApp(App);
if (module.hot) {
    module.hot.accept("./components/App", () => {
      console.log(' THIS IS FIRING?');
      const NextApp = require('./components/App').default
        renderApp(NextApp);
    });
}
