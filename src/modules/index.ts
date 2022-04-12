import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';

import market from 'modules/market/reducer';

// saga
import marketSaga from './market/sagas';

const rootReducer = combineReducers({
  market,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([fork(marketSaga)]);
}
