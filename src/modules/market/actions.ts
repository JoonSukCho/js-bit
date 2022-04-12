import { MarketItem } from 'api/market';
import {
  MARKET_LIST_REQUEST,
  MARKET_LIST_SUCCESS,
  MARKET_LIST_FAILURE,
} from 'modules/market/types';

export const getMarketList = () => ({
  type: MARKET_LIST_REQUEST,
});

export const getMarketListSuccess = (data: MarketItem[]) => ({
  type: MARKET_LIST_SUCCESS,
  payload: { data },
});

export const getMarketListFailure = (error) => ({
  type: MARKET_LIST_FAILURE,
  payload: { error },
});

export type ActionRequest =
  | ReturnType<typeof getMarketList>
  | ReturnType<typeof getMarketListSuccess>
  | ReturnType<typeof getMarketListFailure>;
