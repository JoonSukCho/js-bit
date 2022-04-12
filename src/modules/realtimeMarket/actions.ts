import {
  MarketRealTimeRequestParams,
  MarketRealTimeResponse,
} from 'api/realtimeMarket';
import {
  MARKET_REAL_TIME_CONNECT,
  MARKET_REAL_TIME_SUCCESS,
  MARKET_REAL_TIME_FAILURE,
} from 'modules/realtimeMarket/types';

// 소켓으로 실시간 코인 정보 가져오기
export const getMarketRealTimeData = (params: MarketRealTimeRequestParams) => ({
  type: MARKET_REAL_TIME_CONNECT,
  payload: params,
});

export const getMarketRealTimeDataSuccess = (
  response: MarketRealTimeResponse[],
) => ({
  type: MARKET_REAL_TIME_SUCCESS,
  payload: { response },
});

export const getMarketRealTimeDataFailure = (error) => ({
  type: MARKET_REAL_TIME_FAILURE,
  payload: { error },
});

export type ActionRequest =
  | ReturnType<typeof getMarketRealTimeData>
  | ReturnType<typeof getMarketRealTimeDataSuccess>
  | ReturnType<typeof getMarketRealTimeDataFailure>;
