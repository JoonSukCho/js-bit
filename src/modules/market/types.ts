import { MarketList, MarketMinuteCandle } from 'api/types/market';

export const LOAD_MARKET_LIST_REQUEST = 'LOAD_MARKET_LIST_REQUEST' as const;
export const LOAD_MARKET_LIST_SUCCESS = 'LOAD_MARKET_LIST_SUCCESS' as const;
export const LOAD_MARKET_LIST_FAILURE = 'LOAD_MARKET_LIST_FAILURE' as const;

export const LOAD_MARKET_MIN_CANDLE_REQUEST =
  'LOAD_MARKET_MIN_CANDLE_REQUEST' as const;
export const LOAD_MARKET_MIN_CANDLE_SUCCESS =
  'LOAD_MARKET_MIN_CANDLE_SUCCESS' as const;
export const LOAD_MARKET_MIN_CANDLE_FAILURE =
  'LOAD_MARKET_MIN_CANDLE_FAILURE' as const;

export interface MarketState {
  marketList: MarketList;
  loadMarketListLoading: boolean;
  loadMarketListDone: boolean;
  loadMarketListError: string | null;

  marketMinCandle: MarketMinuteCandle;
  loadMarketMinCandleLoading: boolean;
  loadMarketMinCandleDone: boolean;
  loadMarketMinCandleError: string | null;
}
