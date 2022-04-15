import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import realtimeMarketMiddleware from './middlewares/realtimeMarketMiddleware';
import marketSlice from './slices/marketSlice';
import realtimeMarketSlice from './slices/realtimeMarketSlice';

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
      'realtimeMarket/receiveData',
      'realtimeMarket/completeConnection',
    ];

    return !dontLogActions.includes(action.type);
  },
});

const rootReducer = combineReducers({
  market: marketSlice.reducer,
  realtimeMarket: realtimeMarketSlice.reducer,
});

const initialState = {};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([realtimeMarketMiddleware, logger]),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: initialState,
  enhancers: (defaultEnhancers) => [...defaultEnhancers],
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
