
import { createStore, applyMiddleware, compose } from 'redux';
// import devTools from 'remote-redux-devtools'
// import thunk from 'redux-thunk';
// import { createEpicMiddleware } from 'redux-observable';
import reducer from './reducers';
// import rootEpic from './epics';
// import { autoRehydrate, persistStore } from 'redux-persist'
// import promise from './promise';
// const epicMiddleware = createEpicMiddleware(rootEpic)
export default function configureStore() {
  const enhancer = compose(
    // applyMiddleware(epicMiddleware),
    // autoRehydrate(),
    // devTools(),
  );

  const store = createStore(reducer, enhancer);
  // const persist = persistStore(
  // store,
  // { storage: AsyncStorage, blacklist: ['userData'] }, (err, storage) => {
  // console.log(' WHAT IS IN OUR STORAGE', storage);
  // });
  // NOTE: if you need to clear your async storage just uncomment below method
  //  persist.purge();

  return store;
}
