import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  RealtimeMarketTicker,
  RealtimeMarketReqParams,
  RealtimeMarketTickerList,
} from 'services/types/realtimeMarket';
import { RootState } from 'store/config';

interface RtmTickerState {
  rtmTickerList: RealtimeMarketTickerList;
  isConnected: boolean;
  connectionError: string;
}
const initialState: RtmTickerState = {
  rtmTickerList: [],
  isConnected: false,
  connectionError: '',
};

export const rtmTickerSlice = createSlice({
  name: 'realtimeMarketTicker',
  initialState,
  reducers: {
    startConnect: (state, action: PayloadAction<RealtimeMarketReqParams>) => {
      return;
    },
    errorConnection: (state, action) => {
      state.connectionError = action.payload;
      state.isConnected = false;
    },
    receiveRtmTicker: (state, action: PayloadAction<RealtimeMarketTicker>) => {
      if (
        state.rtmTickerList
          .map((ticker) => ticker.code)
          .includes(action.payload.code)
      ) {
        // ADD
        state.rtmTickerList = state.rtmTickerList.map((ticker) => {
          if (ticker.code === action.payload.code) {
            return action.payload;
          } else {
            return ticker;
          }
        });
      } else {
        state.rtmTickerList.push(action.payload);
      }

      state.isConnected = true;
    },
  },
});

export const rtmTickerActions = rtmTickerSlice.actions;

export const selectedRtmSummarySelector = createSelector(
  (state: RootState) => state.rtmTicker.rtmTickerList,
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

export default rtmTickerSlice;
