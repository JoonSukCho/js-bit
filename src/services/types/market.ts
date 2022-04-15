// 마켓 리스트
export type MarketList = MarketListItem[];
export interface MarketListItem {
  market: string;
  korean_name: string;
  english_name: string;
}

// 분캔들
export interface MarketMinCandleReqParams {
  unit: number; // 1, 3, 5, 10, 15, 30, 60, 240 분 단위
  market: string; // 마켓 코드
  to?: string; // 마지막 캔들 시각 (yyyy-MM-dd HH:mm:ss)
  count?: number; // 캔들 개수 (최대 200개)
}
export interface MarketMinCandleItem {
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
export type MarketMinCandle = MarketMinCandleItem[];

// 일캔들
export interface MarketDayCandleReqParams {
  market: string; // 마켓 코드
  to?: string; // 마지막 캔들 시각 (yyyy-MM-dd HH:mm:ss)
  count?: number; // 캔들 개수
  convertingPriceUnit?: string; // 종가 환산 화폐 단위 (KRW)
}
export interface MarketDayCandleItem {
  market: string; // 마켓명
  candle_date_time_utc: string; // 캔들 기준 시각
  candle_date_time_kst: string;
  opening_price: number; // 시가
  high_price: number; // 고가
  low_price: number; // 저가
  trade_price: number; // 종가
  timestamp: number; // 마지막 틱이 저장된 시각
  candle_acc_trade_price: number; // 누적 거래 금액
  candle_acc_trade_volume: number; // 누적 거래 량
  prev_closing_price: number; // 전일 종가
  change_price: number; // 전일 종가 대비 변화 금액
  change_rate: number; // 전일 종가 대비 변화량
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
