import { createLogger } from 'redux-logger';

const logger = createLogger({
  collapsed: true,
  duration: true,
  timestamp: false,
  colors: {
    title: (action) => {
      if (action.type.includes('fulfilled')) {
        return 'green';
      }
      if (action.type.includes('rejected')) {
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
    const dontLogActions = [
      'realtimeMarket/receiveRealtimeMarketTicker',
      'realtimeMarket/receiveRealtimeMarketOrderbook',
      'realtimeMarket/completeConnection',
    ];

    return !dontLogActions.includes(action.type);
  },
});

export default logger;
