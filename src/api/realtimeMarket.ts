export interface MarketRealTimeRequestParams {
  connectType: 'ticker' | 'trade' | 'orderbook'; // 현재가 - ticker, 체결 - trade, 호가 - orderbook
  codes: string[];
}

export interface MarketRealTimeResponse {
  acc_ask_volume: number; // 누적 매도량
  acc_bid_volume: number; // 누적 매수량
  acc_trade_price: number; // 누적 거래대금
  acc_trade_price_24h: number; // 24시간 누적 거래대금
  acc_trade_volume: number; // 누적 거래량
  acc_trade_volume_24h: number; // 24시간 누적 거래량
  ask_bid: string; // 매수/매도 구분
  change: string; // 전일대비
  change_price: number; // 부호 없는 전일대비
  change_rate: number; // 부호 없는 전일대비 등락률
  code: string; // 마켓 코드
  delisting_date: string; // 상장폐지일
  high_price: number; // 고가
  highest_52_week_date: string; // 52주 최고가 달성일
  highest_52_week_price: number; // 52주 최고가
  is_trading_suspended: boolean; // 거래 정지 여부
  low_price: number; // 저가
  lowest_52_week_date: string; // 52주 최저가 달성일
  lowest_52_week_price: number; // 52주 최저가
  market_state: string; // 거래 상태
  market_warning: string; // 유의 종목 여부
  opening_price: number; // 시가
  prev_closing_price: number; // 전일 종가
  signed_change_price: number; // 전일대비값
  signed_change_rate: number; // 전일대비 등락률
  stream_type: string; // 스트림 타입 (스냅샷, 실시간)
  timestamp: number; // 타임스탬프
  trade_date: string; // 최근 거래 일자
  trade_price: number; // 현재가
  trade_time: string; // 최근 거래 시각
  trade_timestamp: number; // 체결 타임스탬프
  trade_volume: number; //
  type: string; // 타입 (현재가 - ticker, 체결 - trade, 호가 - orderbook)
}
