import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from './middlewares/loggerMiddleware';
import rtmTickerMiddleware from './middlewares/rtmTickerMiddleware';
import marketSlice from './slices/marketSlice';
import rtmTickerSlice from './slices/rtmTickerSlice';
import rtmOrderbookMiddleware from './middlewares/rtmOrderbookMiddleware';
import rtmOrderbookSlice from './slices/rtmOrderbookSlice';

const rootReducer = combineReducers({
  market: marketSlice.reducer,
  rtmTicker: rtmTickerSlice.reducer,
  rtmOrderbook: rtmOrderbookSlice.reducer,
});

const initialState = {};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      rtmTickerMiddleware,
      rtmOrderbookMiddleware,
      logger,
    ]),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: initialState,
  enhancers: (defaultEnhancers) => [...defaultEnhancers],
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
