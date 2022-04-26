// 미들웨어 방식 말고 다르게 해서
// services/market 호출 처럼 진행해보자

import { Middleware } from 'redux';
import { rtmTickerActions } from 'store/slices/rtmTickerSlice';

const rtmTickerMiddleware: Middleware = (store) => {
  let socket: WebSocket;

  return (next) => (action) => {
    if (rtmTickerActions.startConnect.match(action)) {
      socket = new WebSocket('wss://api.upbit.com/websocket/v1');
      socket.binaryType = 'arraybuffer';

      socket.onopen = () => {
        socket.send(
          JSON.stringify([
            { ticket: 'js-bit' },
            { type: 'ticker', codes: action.payload.codes },
          ]),
        );
      };

      socket.onmessage = (event) => {
        try {
          const enc = new TextDecoder('utf-8');
          const arr = new Uint8Array(event.data);
          const parsedData = JSON.parse(enc.decode(arr));

          store.dispatch(rtmTickerActions.receiveRtmTicker(parsedData));

          store.dispatch(rtmTickerActions.completeConnection());
        } catch (error) {
          store.dispatch(rtmTickerActions.errorConnection(error));
        }
      };

      socket.onerror = (event) => {
        store.dispatch(rtmTickerActions.errorConnection(event.type));
      };
    }

    next(action);
  };
};

export default rtmTickerMiddleware;
