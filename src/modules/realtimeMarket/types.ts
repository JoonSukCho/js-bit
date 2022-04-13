import { RealtimeMarket } from 'api/types/realtimeMarket';

export const CONNECT_REAL_TIME_MARKET_REQUEST =
  'CONNECT_REAL_TIME_MARKET_REQUEST' as const;
export const CONNECT_REAL_TIME_MARKET_SUCCESS =
  'CONNECT_REAL_TIME_MARKET_SUCCESS' as const;
export const CONNECT_REAL_TIME_MARKET_FAILURE =
  'CONNECT_REAL_TIME_MARKET_FAILURE' as const;

export interface RealtimeMarketState {
  realTimeMarket: RealtimeMarket[];
  connection: boolean;
  error: string | null;
}
