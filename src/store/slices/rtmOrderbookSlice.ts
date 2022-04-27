import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  RealtimeMarketOrderbook,
  RealtimeMarketOrderbookList,
  RealtimeMarketReqParams,
} from 'services/types/realtimeMarket';
import { RootState } from 'store/config';

interface RtmOrderbookState {
  rtmOrderbook: RealtimeMarketOrderbook;
  isConnected: boolean;
  connectionError: string;
}
const initialState: RtmOrderbookState = {
  rtmOrderbook: {} as RealtimeMarketOrderbook,
  isConnected: false,
  connectionError: '',
};

export const rtmOrderbookSlice = createSlice({
  name: 'realtimeMarketOrderbook',
  initialState,
  reducers: {
    startConnect: (state, action: PayloadAction<RealtimeMarketReqParams>) => {
      return;
    },
    stopConnect: () => {
      return;
    },
    errorConnection: (state, action) => {
      state.connectionError = action.payload;
      state.isConnected = false;
    },
    receiveRtmOrderbook: (
      state,
      action: PayloadAction<RealtimeMarketOrderbook>,
    ) => {
      state.rtmOrderbook = action.payload;
      state.isConnected = true;
    },
  },
});

export const rtmOrderbookActions = rtmOrderbookSlice.actions;

export default rtmOrderbookSlice;
