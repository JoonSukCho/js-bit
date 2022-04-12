import { all, fork, put, call, takeLatest } from 'redux-saga/effects';
import { MARKET_LIST_REQUEST } from 'modules/market/types';
import {
  getMarketListSuccess,
  getMarketListFailure,
} from 'modules/market/actions';
import marketApi, { MarketListResponse } from 'api/market';

function* getMarketListSaga() {
  try {
    const response: MarketListResponse = yield call(marketApi.getMarketList);
    const krMarketList = response.data.filter((list) =>
      list.market.includes('KRW-'),
    );

    yield put(getMarketListSuccess(krMarketList));
  } catch (err) {
    yield put(getMarketListFailure(err));
  }
}

function* watchGetMarketListSaga() {
  yield takeLatest(MARKET_LIST_REQUEST, getMarketListSaga);
}

export default function* marketSaga() {
  yield all([fork(watchGetMarketListSaga)]);
}
