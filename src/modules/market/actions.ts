import {
  MarketList,
  MarketMinuteCandle,
  MarketMinuteCandleReqParams,
} from 'api/types/market';
import {
  LOAD_MARKET_LIST_REQUEST,
  LOAD_MARKET_LIST_SUCCESS,
  LOAD_MARKET_LIST_FAILURE,
  LOAD_MARKET_MIN_CANDLE_REQUEST,
  LOAD_MARKET_MIN_CANDLE_SUCCESS,
  LOAD_MARKET_MIN_CANDLE_FAILURE,
} from 'modules/market/types';

// 코인 리스트 가져오기
export const getMarketList = () => ({
  type: LOAD_MARKET_LIST_REQUEST,
});

export const getMarketListSuccess = (data: MarketList) => ({
  type: LOAD_MARKET_LIST_SUCCESS,
  payload: { data },
});

export const getMarketListFailure = (error) => ({
  type: LOAD_MARKET_LIST_FAILURE,
  payload: { error },
});

export const getMarketMinCandle = (params: MarketMinuteCandleReqParams) => ({
  type: LOAD_MARKET_MIN_CANDLE_REQUEST,
  payload: params,
});

export const getMarketMinCandleSuccess = (data: MarketMinuteCandle) => ({
  type: LOAD_MARKET_MIN_CANDLE_SUCCESS,
  payload: { data },
});

export const getMarketMinCandleFailure = (error) => ({
  type: LOAD_MARKET_MIN_CANDLE_FAILURE,
  payload: { error },
});

export type ActionRequest =
  | ReturnType<typeof getMarketList>
  | ReturnType<typeof getMarketListSuccess>
  | ReturnType<typeof getMarketListFailure>
  | ReturnType<typeof getMarketMinCandle>
  | ReturnType<typeof getMarketMinCandleSuccess>
  | ReturnType<typeof getMarketMinCandleFailure>;
