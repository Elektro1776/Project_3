
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './components/App';
import { Provider } from 'react-redux';
import createStore from './createstore';

const store = createStore();
const serverRender = () => {
  return renderToString(
    <Provider store={store}>
            <App />
    </Provider>,
  )
}

export default serverRender;
