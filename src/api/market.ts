import axios from 'axios';
import {
  MarketDayCandle,
  MarketDayCandleReqParams,
  MarketList,
  MarketMinuteCandle,
  MarketMinuteCandleReqParams,
  MarketMonthCandle,
  MarketMonthCandleReqParams,
  MarketWeekCandle,
  MarketWeekCandleReqParams,
} from 'api/types/market';

const marketApi = {
  // 마켓 리스트
  async getMarketList(): Promise<MarketList> {
    const response = await axios.get('https://api.upbit.com/v1/market/all');

    return response.data;
  },

  // 마켓 분캔들
  async getMarketMinuteCandle({
    unit,
    market,
    to,
    count,
  }: MarketMinuteCandleReqParams): Promise<MarketMinuteCandle> {
    const response = await axios.get(
      `https://api.upbit.com/v1/candles/minutes/${unit}`,
      {
        params: {
          market,
          to,
          count,
        },
      },
    );

    return response.data;
  },

  // 마켓 일캔들
  async getMarketDayCandle({
    market,
    to,
    count,
    convertingPriceUnit,
  }: MarketDayCandleReqParams): Promise<MarketDayCandle> {
    const response = await axios.get(`https://api.upbit.com/v1/candles/days`, {
      params: {
        market,
        to,
        count,
        convertingPriceUnit,
      },
    });

    return response.data;
  },

  // 마켓 주캔들
  async getMarketWeekCandle({
    market,
    to,
    count,
  }: MarketWeekCandleReqParams): Promise<MarketWeekCandle> {
    const response = await axios.get(`https://api.upbit.com/v1/candles/weeks`, {
      params: {
        market,
        to,
        count,
      },
    });

    return response.data;
  },

  // 마켓 월캔들
  async getMarketMonthCandle({
    market,
    to,
    count,
  }: MarketMonthCandleReqParams): Promise<MarketMonthCandle> {
    const response = await axios.get(
      `https://api.upbit.com/v1/candles/months`,
      {
        params: {
          market,
          to,
          count,
        },
      },
    );

    return response.data;
  },
};

export default marketApi;
