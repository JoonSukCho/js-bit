import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  RealtimeMarket,
  RealtimeMarketItem,
  RealtimeMarketReqParams,
} from 'services/types/realtimeMarket';

interface RealtimeMarketState {
  data: RealtimeMarketItem;
  isConnected: boolean;
  connectionError: string;
}
const initialState: RealtimeMarketState = {
  data: {} as RealtimeMarketItem,
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
    receiveData: (state, action: PayloadAction<RealtimeMarketItem>) => {
      state.data = action.payload;
    },
  },
});

export const realtimeMarketActions = realtimeMarketSlice.actions;

export default realtimeMarketSlice;
