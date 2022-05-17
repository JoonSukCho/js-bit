import React, { useCallback, useEffect, useMemo } from 'react';
import { useAppSelector } from 'store/config';
import { marketListSelector } from 'store/slices/marketSlice';
import styled from 'styled-components';
import Article from './Article';
import CoinListItem from './CoinListItem';

const CoinList = () => {
  const realtimeMarketTickerList = useAppSelector(
    (state) => state.rtmTicker.rtmTickerList,
  );
  const isConnected = useAppSelector((state) => state.rtmTicker.isConnected);

  const sortedRealtimeMarketTickerList = useMemo(() => {
    if (isConnected) {
      return [...realtimeMarketTickerList].sort(
        (a, b) => b.acc_trade_price_24h - a.acc_trade_price_24h,
      );
    }

    return realtimeMarketTickerList;
  }, [realtimeMarketTickerList, isConnected]);

  return (
    <S.Container>
      <S.ListHeader>
        <S.ListHeaderItem>한글명</S.ListHeaderItem>
        <S.ListHeaderItem>현재가</S.ListHeaderItem>
        <S.ListHeaderItem>전일대비</S.ListHeaderItem>
        <S.ListHeaderItem>거래대금</S.ListHeaderItem>
      </S.ListHeader>
      <S.ListBody>
        {isConnected ? (
          sortedRealtimeMarketTickerList.map((ticker) => (
            <CoinListItem key={ticker.code} {...ticker} />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </S.ListBody>
    </S.Container>
  );
};

const S = {
  Container: styled(Article)`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: #fff;

    @media (min-width: 1024px) {
      max-width: 470px;
    }
  `,
  ListHeader: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    font-size: 0.82rem;
  `,
  ListHeaderItem: styled.div`
    display: table-cell;
    padding: 0.75rem 1rem;
    text-align: center;
    color: #666;
  `,
  ListBody: styled.div`
    width: 100%;
    height: 735px;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
    &::-webkit-scrollbar-track-piece {
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background-color: #d9d9d9;
    }
    &::-webkit-scrollbar-button:start {
      background-color: transparent;
    }
    &::-webkit-scrollbar-button:end {
      background-color: transparent;
    }
  `,
};

export default React.memo(CoinList);
