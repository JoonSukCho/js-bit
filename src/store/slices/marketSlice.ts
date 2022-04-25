import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  MarketList,
  MarketDayCandleList,
  MarketItem,
} from 'services/types/market';
import { marketService } from 'services/market';
import { RootState } from 'store/config';

interface MarketState {
  marketList: MarketList;
  loadMarketListLoading: boolean;
  loadMarketListDone: boolean;
  loadMarketListError: string;

  dayCandles: MarketDayCandleList; // 일 캔들
  loadDayCandlesLoading: boolean;
  loadDayCandlesDone: boolean;
  loadDayCandlesError: string;

  orderBooks: any; // 호가
  loadOrderBooksLoading: boolean;
  loadOrderBooksDone: boolean;
  loadOrderBooksError: string;

  selectedMarket: MarketItem; // 선택된 마켓 정보
}

const initialState: MarketState = {
  marketList: [],
  loadMarketListLoading: false,
  loadMarketListDone: false,
  loadMarketListError: '',

  dayCandles: [],
  loadDayCandlesLoading: false,
  loadDayCandlesDone: false,
  loadDayCandlesError: '',

  orderBooks: [],
  loadOrderBooksLoading: false,
  loadOrderBooksDone: false,
  loadOrderBooksError: '',

  selectedMarket: {
    market: '',
    korean_name: '',
    english_name: '',
  },
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
        state.marketList = action.payload;
      })
      .addCase(marketService.getMarketList.rejected, (state, action) => {
        state.loadMarketListLoading = false;
        state.loadMarketListError = action.error.message;
      })
      // 분캔들
      .addCase(marketService.getMarketDayCandle.pending, (state, action) => {
        state.loadDayCandlesLoading = true;
        state.loadDayCandlesDone = false;
      })
      .addCase(marketService.getMarketDayCandle.fulfilled, (state, action) => {
        state.loadDayCandlesLoading = false;
        state.loadDayCandlesDone = true;
        state.dayCandles = action.payload;
      })
      .addCase(marketService.getMarketDayCandle.rejected, (state, action) => {
        state.loadDayCandlesLoading = false;
        state.loadMarketListError = action.error.message;
      });
  },
});

export const marketActions = marketSlice.actions;

// useSelector를 일일이 분리시키기 힘든 상황에서는
// 별도의 Selector를 만들어서 렌더링 최적화를 시키자.
export const marketListSelector = createSelector(
  (state: RootState) => state.market.marketList,
  (state: RootState) => state.market.loadMarketListDone,
  (state: RootState) => state.market.loadMarketListLoading,
  (state: RootState) => state.market.loadMarketListError,
  (
    marketList,
    loadMarketListDone,
    loadMarketListLoading,
    loadMarketListError,
  ) => {
    return {
      marketList,
      loadMarketListDone,
      loadMarketListLoading,
      loadMarketListError,
    };
  },
);

export const marketDayCandleSelector = createSelector(
  (state: RootState) => state.market.dayCandles,
  (state: RootState) => state.market.loadDayCandlesDone,
  (state: RootState) => state.market.loadDayCandlesLoading,
  (state: RootState) => state.market.loadDayCandlesError,
  (
    dayCandles,
    loadDayCandlesDone,
    loadDayCandlesLoading,
    loadDayCandlesError,
  ) => {
    return {
      dayCandles,
      loadDayCandlesDone,
      loadDayCandlesLoading,
      loadDayCandlesError,
    };
  },
);

export default marketSlice;
