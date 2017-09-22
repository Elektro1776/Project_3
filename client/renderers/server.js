
import React from 'React';
import ReactDomServer from 'react-dom/server';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import configureStore from '../createstore';

const serverRenderer = async () => {
  const store = configureStore();
  return {
    initialMarkup: ReactDOMServer.renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    ),
  };
}
export default serverRenderer;
