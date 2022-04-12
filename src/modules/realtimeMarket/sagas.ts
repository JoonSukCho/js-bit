import {
  all,
  fork,
  put,
  call,
  takeLatest,
  flush,
  select,
  delay,
} from 'redux-saga/effects';
import { MARKET_REAL_TIME_CONNECT } from 'modules/realtimeMarket/types';
import {
  getMarketRealTimeDataSuccess,
  getMarketRealTimeDataFailure,
  ActionRequest,
  getMarketRealTimeData,
} from 'modules/realtimeMarket/actions';
import { MarketRealTimeResponse } from 'api/realtimeMarket';
import { buffers, eventChannel } from 'redux-saga';

const createSocket = () => {
  const client = new WebSocket('wss://api.upbit.com/websocket/v1');
  client.binaryType = 'arraybuffer';

  return client;
};

const connectSocket = ({ socket, connectType, codes, buffer }) => {
  return eventChannel((emit) => {
    socket.onopen = () => {
      socket.send(
        JSON.stringify([
          { ticket: 'js-bit' },
          { type: connectType, codes: codes },
        ]),
      );
    };

    socket.onmessage = (event) => {
      const enc = new TextDecoder('utf-8');
      const arr = new Uint8Array(event.data);
      const data = JSON.parse(enc.decode(arr));

      emit(data);
    };

    socket.onerror = (error) => {
      emit(error);
    };

    const unsubscribe = () => {
      socket.close();
    };

    return unsubscribe;
  }, buffer || buffers.none());
};

function* getRealtimeMarketSaga(
  action: ReturnType<typeof getMarketRealTimeData>,
) {
  const socket = yield call(createSocket);
  const clientChannel = yield call(connectSocket, {
    ...action.payload,
    socket,
    buffer: buffers.expanding(500),
  });

  while (true) {
    try {
      // flush는 channel에서 리턴하는 모든 버퍼 값들을 다룬다.
      const bufferData: MarketRealTimeResponse[] = yield flush(clientChannel);

      if (bufferData.length) {
        const sortedObj = {};
        bufferData.forEach((data) => {
          if (sortedObj[data.code]) {
            // 버퍼에 있는 데이터중 시간이 가장 최근인 데이터만 남김
            sortedObj[data.code] =
              sortedObj[data.code].timestamp > data.timestamp
                ? sortedObj[data.code]
                : data;
          } else {
            sortedObj[data.code] = data; // 새로운 데이터면 그냥 넣음
          }
        });

        const sortedData = Object.keys(sortedObj).map(
          (data) => sortedObj[data],
        );

        yield put(getMarketRealTimeDataSuccess(sortedData));
      }

      yield delay(500); // 500ms 동안 대기
    } catch (error) {
      yield put(getMarketRealTimeDataFailure(error));
    }
  }
}

function* watchRealtimeMarketSaga() {
  yield takeLatest(MARKET_REAL_TIME_CONNECT, getRealtimeMarketSaga);
}

export default function* marketSaga() {
  yield all([fork(watchRealtimeMarketSaga)]);
}
