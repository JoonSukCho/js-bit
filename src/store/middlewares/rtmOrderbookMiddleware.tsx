// 미들웨어 방식 말고 다르게 해서
// services/market 호출 처럼 진행해보자

import { Middleware } from 'redux';
import { rtmOrderbookActions } from 'store/slices/rtmOrderbookSlice';

const rtmOrderbookMiddleware: Middleware = (store) => {
  let socket: WebSocket;

  return (next) => (action) => {
    if (rtmOrderbookActions.startConnect.match(action)) {
      socket = new WebSocket('wss://api.upbit.com/websocket/v1');
      socket.binaryType = 'arraybuffer';

      socket.onopen = () => {
        socket.send(
          JSON.stringify([
            { ticket: 'js-bit' },
            { type: 'orderbook', codes: action.payload.codes },
          ]),
        );
      };

      socket.onmessage = (event) => {
        try {
          const enc = new TextDecoder('utf-8');
          const arr = new Uint8Array(event.data);
          const parsedData = JSON.parse(enc.decode(arr));

          store.dispatch(rtmOrderbookActions.receiveRtmOrderbook(parsedData));
        } catch (error) {
          store.dispatch(rtmOrderbookActions.errorConnection(error));
        }
      };

      socket.onerror = (event) => {
        store.dispatch(rtmOrderbookActions.errorConnection(event.type));
      };
    }

    // 코인 선택을 변경하면, 소켓을 끊고 새로 연결한다.
    if (rtmOrderbookActions.stopConnect.match(action) && socket) {
      socket.close();
    }

    next(action);
  };
};

export default rtmOrderbookMiddleware;
