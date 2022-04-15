import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MarketList, MarketDayCandle, MarketItem } from 'services/types/market';
import { marketService } from 'services/market';
import { RootState } from 'store/config';

interface MarketState {
  data: MarketList;
  loadMarketListLoading: boolean;
  loadMarketListDone: boolean;
  loadMarketListError: string;

  selectedMarket: MarketItem; // 선택된 마켓 정보

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

  selectedMarket: {
    market: '',
    korean_name: '',
    english_name: '',
  },

  dayCandleData: [],
  loadDayCandleLoading: false,
  loadDayCandleDone: false,
  loadDayCandleError: '',
};

export const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setSelectMarket: (state, action: PayloadAction<MarketItem>) => {
      state.selectedMarket = action.payload;
      return;
    },
  },
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

export const marketActions = marketSlice.actions;

// useSelector를 일일이 분리시키기 힘든 상황에서는
// 별도의 Selector를 만들어서 렌더링 최적화를 시키자.
export const marketListSelector = createSelector(
  (state: RootState) => state.market.data,
  (state: RootState) => state.market.loadMarketListDone,
  (state: RootState) => state.market.loadMarketListLoading,
  (state: RootState) => state.market.loadMarketListError,
  (data, loadMarketListDone, loadMarketListLoading, loadMarketListError) => {
    return {
      data,
      loadMarketListDone,
      loadMarketListLoading,
      loadMarketListError,
    };
  },
);

export const marketDayCandleSelector = createSelector(
  (state: RootState) => state.market.dayCandleData,
  (state: RootState) => state.market.loadDayCandleDone,
  (state: RootState) => state.market.loadDayCandleLoading,
  (state: RootState) => state.market.loadDayCandleError,
  (
    dayCandleData,
    loadDayCandleDone,
    loadDayCandleLoading,
    loadDayCandleError,
  ) => {
    return {
      dayCandleData,
      loadDayCandleDone,
      loadDayCandleLoading,
      loadDayCandleError,
    };
  },
);

export default marketSlice;
