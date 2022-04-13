import { all, fork, put, call, takeLatest } from 'redux-saga/effects';
import {
  LOAD_MARKET_LIST_REQUEST,
  LOAD_MARKET_MIN_CANDLE_REQUEST,
} from 'modules/market/types';
import {
  getMarketListSuccess,
  getMarketListFailure,
  getMarketMinCandleSuccess,
  getMarketMinCandleFailure,
  getMarketMinCandle,
} from 'modules/market/actions';
import marketApi from 'api/market';
import { MarketList, MarketMinuteCandle } from 'api/types/market';

// 마켓 리스트
function* getMarketListSaga() {
  try {
    const response: MarketList = yield call(marketApi.getMarketList);
    const krMarketList = response.filter((list) =>
      list.market.includes('KRW-'),
    );

    yield put(getMarketListSuccess(krMarketList));
  } catch (err) {
    yield put(getMarketListFailure(err));
  }
}
function* watchGetMarketListSaga() {
  yield takeLatest(LOAD_MARKET_LIST_REQUEST, getMarketListSaga);
}

// 분캔들
function* getMarketMinCandleSaga(
  action: ReturnType<typeof getMarketMinCandle>,
) {
  try {
    const response: MarketMinuteCandle = yield call(
      marketApi.getMarketMinuteCandle,
      action.payload,
    );

    yield put(getMarketMinCandleSuccess(response));
  } catch (err) {
    yield put(getMarketMinCandleFailure(err));
  }
}

function* watchGetMarketMinCandleSaga() {
  yield takeLatest(LOAD_MARKET_MIN_CANDLE_REQUEST, getMarketMinCandleSaga);
}

export default function* marketSaga() {
  yield all([fork(watchGetMarketListSaga), fork(watchGetMarketMinCandleSaga)]);
}
