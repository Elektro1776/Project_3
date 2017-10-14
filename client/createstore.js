
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import reducer from './reducers';

export default function configureStore(history, initalState) {
  const composeEnhancers = composeWithDevTools({ realtime: true });
  const routeMiddleware = routerMiddleware(history);
  const middleware = [thunk, routeMiddleware];
  const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
    // devTools({
    //   realtime: false,
    //   sendOnError: 1,
    //   maxAge: 30
    // })
  );
  // const initalState = window.__INITALSTATE__;
  console.log(' WHAT IS THE INITAL STATE?', initalState);
  const store = createStore(reducer, initalState, enhancer);
  console.log(' WHAT I SOUR STORE STATE?', store.getState());
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
