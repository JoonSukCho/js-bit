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
    completeConnection: (state) => {
      state.isConnected = true;
    },
    errorConnection: (state, action) => {
      state.connectionError = action.payload;
    },
    receiveRtmOrderbook: (
      state,
      action: PayloadAction<RealtimeMarketOrderbook>,
    ) => {
      state.rtmOrderbook = action.payload;
    },
  },
});

export const rtmOrderbookActions = rtmOrderbookSlice.actions;

export default rtmOrderbookSlice;
