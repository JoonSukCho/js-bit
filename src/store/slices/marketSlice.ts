import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MarketList, MarketDayCandle } from 'services/types/market';
import { marketService } from 'services/market';

interface MarketState {
  data: MarketList;
  loadMarketListLoading: boolean;
  loadMarketListDone: boolean;
  loadMarketListError: string;

  dayCandleData: MarketDayCandle;
  loadDayCandleLoading: boolean;
  loadDayCandleDone: boolean;
  loadDayCandleError: string;
}
const initialState: MarketState = {
  data: [],
  loadMarketListLoading: false,
  loadMarketListDone: false,
  loadMarketListError: '',

  dayCandleData: [],
  loadDayCandleLoading: false,
  loadDayCandleDone: false,
  loadDayCandleError: '',
};

export const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 마켓 리스트
      .addCase(marketService.getMarketList.pending, (state, action) => {
        state.loadMarketListLoading = true;
        state.loadMarketListDone = false;
      })
      .addCase(marketService.getMarketList.fulfilled, (state, action) => {
        state.loadMarketListLoading = false;
        state.loadMarketListDone = true;
        state.data = action.payload;
      })
      .addCase(marketService.getMarketList.rejected, (state, action) => {
        state.loadMarketListLoading = false;
        state.loadMarketListError = action.error.message;
      })
      // 분캔들
      .addCase(marketService.getMarketDayCandle.pending, (state, action) => {
        state.loadDayCandleLoading = true;
        state.loadDayCandleDone = false;
      })
      .addCase(marketService.getMarketDayCandle.fulfilled, (state, action) => {
        state.loadDayCandleLoading = false;
        state.loadDayCandleDone = true;
        state.dayCandleData = action.payload;
      })
      .addCase(marketService.getMarketDayCandle.rejected, (state, action) => {
        state.loadDayCandleLoading = false;
        state.loadMarketListError = action.error.message;
      });
  },
});

export default marketSlice;
