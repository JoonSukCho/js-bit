// 미들웨어 방식 말고 다르게 해서
// services/market 호출 처럼 진행해보자

import { Middleware } from 'redux';
import { RootState } from 'store/config';
import { realtimeMarketActions } from 'store/slices/realtimeMarketSlice';

const realtimeMarketMiddleware: Middleware = (store) => {
  let socket: WebSocket;

  return (next) => (action) => {
    if (realtimeMarketActions.startConnecting.match(action)) {
      socket = new WebSocket('wss://api.upbit.com/websocket/v1');
      socket.binaryType = 'arraybuffer';

      socket.onopen = () => {
        socket.send(
          JSON.stringify([
            { ticket: 'js-bit' },
            { type: action.payload.connectType, codes: action.payload.codes },
          ]),
        );

        store.dispatch(realtimeMarketActions.completeConnection());
      };

      socket.onmessage = (event) => {
        try {
          const enc = new TextDecoder('utf-8');
          const arr = new Uint8Array(event.data);
          const parsedData = JSON.parse(enc.decode(arr));
          // const state: RootState = store.getState();

          store.dispatch(realtimeMarketActions.receiveData(parsedData));
        } catch (error) {
          store.dispatch(realtimeMarketActions.errorConnection(error));
        }
      };

      socket.onerror = (event) => {
        store.dispatch(realtimeMarketActions.errorConnection(event.type));
      };
    }

    next(action);
  };
};

export default realtimeMarketMiddleware;
