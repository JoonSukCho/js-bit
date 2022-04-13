// 마켓 리스트
export type MarketList = MarketListItem[];
export interface MarketListItem {
  market: string;
  korean_name: string;
  english_name: string;
}

// 분캔들
export interface MarketMinuteCandleReqParams {
  unit: number; // 1, 3, 5, 10, 15, 30, 60, 240 분 단위
  market: string; // 마켓 코드
  to?: string; // 마지막 캔들 시각 (yyyy-MM-dd HH:mm:ss)
  count?: number; // 캔들 개수 (최대 200개)
}
export interface MarketMinuteCandleItem {
  market: string;
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  unit: number;
}
export type MarketMinuteCandle = MarketMinuteCandleItem[];

// 일캔들
export interface MarketDayCandleReqParams {
  market: string; // 마켓 코드
  to?: string; // 마지막 캔들 시각 (yyyy-MM-dd HH:mm:ss)
  count?: number; // 캔들 개수
  convertingPriceUnit?: string; // 종가 환산 화폐 단위 (KRW)
}
export interface MarketDayCandleItem {
  market: string;
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  prev_closing_price: number;
  change_price: number;
  change_rate: number;
}
export type MarketDayCandle = MarketDayCandleItem[];

// 주캔들
export interface MarketWeekCandleReqParams {
  market: string; // 마켓 코드
  to?: string; // 마지막 캔들 시각 (yyyy-MM-dd HH:mm:ss)
  count?: number; // 캔들 개수
}
export interface MarketWeekCandleItem {
  market: string;
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  first_day_of_period: string;
}
export type MarketWeekCandle = MarketWeekCandleItem[];

// 월캔들
export interface MarketMonthCandleReqParams {
  market: string; // 마켓 코드
  to?: string; // 마지막 캔들 시각 (yyyy-MM-dd HH:mm:ss)
  count?: number; // 캔들 개수
}
export interface MarketMonthCandleItem {
  market: string;
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  first_day_of_period: string;
}
export type MarketMonthCandle = MarketMonthCandleItem[];
