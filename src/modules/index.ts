import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';

import market from 'modules/market/reducer';
import realtimeMarket from 'modules/realtimeMarket/reducer';

// saga
import marketSaga from './market/sagas';
import realtimeMarketSaga from './realtimeMarket/sagas';

const rootReducer = combineReducers({
  market,
  realtimeMarket,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([fork(marketSaga), fork(realtimeMarketSaga)]);
}
