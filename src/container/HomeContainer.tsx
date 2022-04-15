import React, { useEffect } from 'react';
import Home from 'layout/Home';
import { useAppDispatch, useAppSelector } from 'store/config';
import { realtimeMarketActions } from 'store/slices/realtimeMarketSlice';
import { marketService } from 'services/market';
import { marketActions, marketListSelector } from 'store/slices/marketSlice';

const HomeContainer = () => {
  const dispatch = useAppDispatch();
  const { data: marketList, loadMarketListDone } =
    useAppSelector(marketListSelector);

  useEffect(() => {
    // 마켓 정보들 요청
    dispatch(marketService.getMarketList());
  }, []);

  useEffect(() => {
    if (loadMarketListDone) {
      const initSelectedMarket = marketList.find(
        (market) => market.market === 'KRW-BTC',
      );

      // 비트코인을 initial Selected Market으로 설정
      dispatch(marketActions.setSelectMarket(initSelectedMarket));

      // 실시간 마켓 데이터 소켓 연결
      dispatch(
        realtimeMarketActions.startConnecting({
          connectType: 'ticker',
          codes: marketList.map((market) => market.market),
        }),
      );
    }
  }, [loadMarketListDone]);

  return <Home />;
};

export default HomeContainer;
