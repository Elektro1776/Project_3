
import React from 'React';
import ReactDomServer from 'react-dom/server';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import App from '../components/App';
import configureStore from '../createstore';

const serverRenderer = async () => {
  const store = configureStore();
  return {
    initialMarkup: ReactDomServer.renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    ),
  };
}

function renderApp(url, store) {
  
}
export const renderPage = function serveIt(req, res) {
  const history = createHistory();
  const store = configureStore(history);

  // const assets = require('../../build/assets.json');

  // assets.manifest.text = fs.readFileSync(
  //   join(__dirname, '..', '..', 'build', basename(assets.manifest.js)),
  //   'utf-8'
  // );

  renderApp(req.url, store);
};
export default serverRenderer;
