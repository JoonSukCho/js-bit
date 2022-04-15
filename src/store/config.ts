import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from './middlewares/loggerMiddleware';
import realtimeMarketMiddleware from './middlewares/realtimeMarketMiddleware';
import marketSlice from './slices/marketSlice';
import realtimeMarketSlice from './slices/realtimeMarketSlice';

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
