
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import reducer from './reducers';

export default function configureStore(history) {
  const routeMiddleware = routerMiddleware(history);
  const composeEnhancers = composeWithDevTools({ realtime: true });
  const middleware = [thunk, routeMiddleware];
  // const enhancer = composeWithDevTools(
  //   applyMiddleware(thunk, routeMiddleware),
  //   // devTools({suppressConnectErrors: false}),
  // );

  const store = createStore(reducer, composeEnhancers(
    applyMiddleware(...middleware),
    // other store enhancers if any
  ));
  // const store = createStore(reducer, enhancer );
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducers = require('./reducers');
      const rootReducer = nextReducers;
      store.replaceReducer(rootReducer);
    });
  }
  return store;
}
