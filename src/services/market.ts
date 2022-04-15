import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  MarketDayCandle,
  MarketDayCandleReqParams,
  MarketList,
  MarketMinCandle,
  MarketMinCandleReqParams,
  MarketMonthCandle,
  MarketMonthCandleReqParams,
  MarketWeekCandle,
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
    MarketMinCandle, // Return type
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
    MarketDayCandle,
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
    MarketWeekCandle,
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
    MarketMonthCandle,
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
};
