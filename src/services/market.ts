import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  MarketDayCandleList,
  MarketDayCandleReqParams,
  MarketList,
  MarketMinCandleList,
  MarketMinCandleReqParams,
  MarketMonthCandleList,
  MarketMonthCandleReqParams,
  MarketOrderBookItem,
  MarketOrderbookReqParams,
  MarketWeekCandleList,
  MarketWeekCandleReqParams,
} from 'services/types/market';

export const marketService = {
  getMarketList: createAsyncThunk<MarketList>(
    'market/getMarketList',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get('https://api.upbit.com/v1/market/all');
        const krMarketList = response.data.filter((list) =>
          list.market.includes('KRW-'),
        );

        return krMarketList;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    },
  ),

  getMarketMinCandle: createAsyncThunk<
    MarketMinCandleList, // Return type
    MarketMinCandleReqParams // First argument type
  >(
    'market/getMarketMinCandle',
    async ({ unit, market, to, count }, { rejectWithValue }) => {
      try {
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
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    },
  ),

  getMarketDayCandle: createAsyncThunk<
    MarketDayCandleList,
    MarketDayCandleReqParams
  >('market/getMarketDayCandle', async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.upbit.com/v1/candles/days`,
        {
          params,
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }),

  getMarketWeekCandle: createAsyncThunk<
    MarketWeekCandleList,
    MarketWeekCandleReqParams
  >('market/getMarketWeekCandle', async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.upbit.com/v1/candles/weeks`,
        {
          params,
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }),

  getMarketMonthCandle: createAsyncThunk<
    MarketMonthCandleList,
    MarketMonthCandleReqParams
  >('market/getMarketMonthCandle', async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.upbit.com/v1/candles/months`,
        {
          params,
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }),

  // 호가
  getMarketOrderbook: createAsyncThunk<
    MarketOrderBookItem[],
    MarketOrderbookReqParams
  >('market/getMarketOrderbook', async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.upbit.com/v1/orderbook`, {
        params,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }),
};
