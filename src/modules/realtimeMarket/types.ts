import { MarketRealTimeResponse } from 'api/realtimeMarket';

export const MARKET_REAL_TIME_CONNECT = 'MARKET_REAL_TIME_CONNECT' as const;
export const MARKET_REAL_TIME_SUCCESS = 'MARKET_REAL_TIME_SUCCESS' as const;
export const MARKET_REAL_TIME_FAILURE = 'MARKET_REAL_TIME_FAILURE' as const;

export interface MarketRealTimeState {
  realTimeData: MarketRealTimeResponse[];
  connection: boolean;
  error: string | null;
}
