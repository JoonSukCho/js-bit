import { MarketItem } from 'api/market';

export const MARKET_LIST_REQUEST = 'MARKET_LIST_REQUEST' as const;
export const MARKET_LIST_SUCCESS = 'MARKET_LIST_SUCCESS' as const;
export const MARKET_LIST_FAILURE = 'MARKET_LIST_FAILURE' as const;

export interface MarketListState {
  marketList: MarketItem[];
  loading: boolean;
  done: boolean;
  error: string | null;
}
