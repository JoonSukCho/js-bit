import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  RealtimeMarketTicker,
  RealtimeMarketReqParams,
  RealtimeMarketOrderbook,
  RealtimeMarketTickerList,
} from 'services/types/realtimeMarket';
import { RootState } from 'store/config';

interface RealtimeMarketState {
  realtimeMarketTickerList: RealtimeMarketTickerList;
  realtimeMarketOrderbook: RealtimeMarketOrderbook;
  isConnected: boolean;
  connectionError: string;
}
const initialState: RealtimeMarketState = {
  realtimeMarketTickerList: [],
  realtimeMarketOrderbook: {} as RealtimeMarketOrderbook,
  isConnected: false,
  connectionError: '',
};

export const realtimeMarketSlice = createSlice({
  name: 'realtimeMarket',
  initialState,
  reducers: {
    startConnecting: (
      state,
      action: PayloadAction<RealtimeMarketReqParams>,
    ) => {
      return;
    },
    completeConnection: (state) => {
      state.isConnected = true;
    },
    errorConnection: (state, action) => {
      state.connectionError = action.payload;
    },
    receiveRealtimeMarketTicker: (
      state,
      action: PayloadAction<RealtimeMarketTicker>,
    ) => {
      if (
        state.realtimeMarketTickerList
          .map((ticker) => ticker.code)
          .includes(action.payload.code)
      ) {
        // ADD
        state.realtimeMarketTickerList = state.realtimeMarketTickerList.map(
          (ticker) => {
            if (ticker.code === action.payload.code) {
              return action.payload;
            } else {
              return ticker;
            }
          },
        );
      } else {
        state.realtimeMarketTickerList.push(action.payload);
      }
    },
    receiveRealtimeMarketOrderbook: (
      state,
      action: PayloadAction<RealtimeMarketOrderbook>,
    ) => {
      state.realtimeMarketOrderbook = action.payload;
    },
  },
});

export const realtimeMarketActions = realtimeMarketSlice.actions;

export const selectedRtmSummarySelector = createSelector(
  (state: RootState) => state.realtimeMarket.realtimeMarketTickerList,
  (state: RootState) => state.market.selectedMarket,
  (realtimeMarketTickerList, selectedMarket) => {
    const filtered = realtimeMarketTickerList.filter(
      (ticker) => ticker.code === selectedMarket.market,
    );

    if (filtered.length > 0) {
      const {
        high_price,
        low_price,
        acc_trade_price_24h,
        acc_trade_volume_24h,
      } = filtered[0];

      return {
        high_price,
        low_price,
        acc_trade_price_24h,
        acc_trade_volume_24h,
      };
    }

    return {};
  },
);

export default realtimeMarketSlice;
