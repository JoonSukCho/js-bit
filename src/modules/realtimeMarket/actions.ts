import { RealtimeMarketReqParams, RealtimeMarket } from 'api/realtimeMarket';
import {
  CONNECT_REAL_TIME_MARKET_REQUEST,
  CONNECT_REAL_TIME_MARKET_SUCCESS,
  CONNECT_REAL_TIME_MARKET_FAILURE,
} from 'modules/realtimeMarket/types';

// 소켓으로 실시간 코인 정보 가져오기
export const getRealtimeMarket = (params: RealtimeMarketReqParams) => ({
  type: CONNECT_REAL_TIME_MARKET_REQUEST,
  payload: params,
});

export const getRealtimeMarketSuccess = (data: RealtimeMarket[]) => ({
  type: CONNECT_REAL_TIME_MARKET_SUCCESS,
  payload: { data },
});

export const getRealtimeMarketFailure = (error) => ({
  type: CONNECT_REAL_TIME_MARKET_FAILURE,
  payload: { error },
});

export type ActionRequest =
  | ReturnType<typeof getRealtimeMarket>
  | ReturnType<typeof getRealtimeMarketSuccess>
  | ReturnType<typeof getRealtimeMarketFailure>;
