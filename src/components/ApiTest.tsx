import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Article from './Article';

import { useAppDispatch, useAppSelector } from 'store/config';
import { marketService } from 'services/market';
import { realtimeMarketActions } from 'store/slices/realtimeMarketSlice';

const ApiTest = () => {
  const dispatch = useAppDispatch();
  const marketList = useAppSelector((state) => state.market.data);

  const { data: realtimedata, isConnected } = useAppSelector(
    (state) => state.realtimeMarket,
    (prev, next) => {
      const f = marketList.filter((market) => market.market === prev.data.code);
      // true면 리렌더링을 하지 않음
      return f.length === 0;
    },
  );

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
      realtimeMarketActions.startConnecting({
        connectType: 'ticker',
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
