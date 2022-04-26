import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Article from './Article';

import { useAppDispatch, useAppSelector } from 'store/config';
import { marketService } from 'services/market';
import { rtmTickerActions } from 'store/slices/rtmTickerSlice';

const ApiTest = () => {
  const dispatch = useAppDispatch();
  const marketList = useAppSelector((state) => state.market.marketList);

  const getMarketList = async () => {
    dispatch(marketService.getMarketList());
  };

  const getDayCandle = async () => {
    dispatch(
      marketService.getMarketDayCandle({
        market: 'KRW-BTC',
        count: 10,
      }),
    );
  };

  const getRealtimeMarket = async () => {
    dispatch(
      rtmTickerActions.startConnect({
        codes: marketList.map((market) => market.market),
      }),
    );
  };

  return (
    <div>
      <button onClick={getMarketList}>getMarketList</button>
      <button onClick={getDayCandle}>getDayCandle</button>
      <button onClick={getRealtimeMarket}>getRealtime</button>
    </div>
  );
};

export default ApiTest;
