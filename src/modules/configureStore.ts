import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import rootReducer, { rootSaga } from 'modules';

export default function configureStore() {
  const logger = createLogger({
    collapsed: true,
    duration: true,
    timestamp: false,
    colors: {
      title: (action) => {
        if (action.type.includes('SUCCESS')) {
          return 'green';
        }
        if (action.type.includes('FAILURE')) {
          return 'red';
        }
      },
      prevState: (prevState) => {
        return 'gray';
      },
      action: (action) => {
        return 'blue';
      },
      nextState: (nextState) => {
        return 'gray';
      },
    },
    predicate: (getState, action) => {
      // log를 남기고 싶지 않은 action은 아래 배열에 추가
      const dontLogActions = ['ANY_ACTION_TYPE'];

      return !dontLogActions.includes(action.type);
    },
  });

  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
  }

  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(rootReducer, enhancer);

  sagaMiddleware.run(rootSaga);

  return store;
}
