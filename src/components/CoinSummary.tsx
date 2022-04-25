import { createSelector } from '@reduxjs/toolkit';
import React, { useMemo } from 'react';
import { RootState, useAppSelector } from 'store/config';
import styled from 'styled-components';
import Article from './Article';
import CoinCharts from 'components/CoinCharts';
import {
  changeLiteral,
  convertAccTradePrice,
  convertChangeRate,
} from 'utils/market';
import { selectedRtmSummarySelector } from 'store/slices/realtimeMarketSlice';
import { shallowEqual } from 'react-redux';

interface CoinNameStyleProps {
  market: string;
}

const CoinSummary = () => {
  const { korean_name, market: selectedMarket } = useAppSelector(
    (state) => state.market.selectedMarket,
  );

  const selectedRtmSummary = useAppSelector(
    selectedRtmSummarySelector,
    shallowEqual,
  );

  if (Object.keys(selectedRtmSummary).length === 0)
    return (
      <Article>
        <div>Loading...</div>
      </Article>
    );

  const { high_price, low_price, acc_trade_price_24h, acc_trade_volume_24h } =
    selectedRtmSummary;
  return (
    <Article>
      <S.CoinName market={selectedMarket.split('-')[1]}>
        {korean_name}
        <S.CoinCode>{selectedMarket}</S.CoinCode>
      </S.CoinName>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderBottom: '1px solid #d4d6dc',
          padding: '18px 20px 14px',
        }}
      >
        <div></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <p>
              고가
              {high_price.toLocaleString()}
            </p>
            <p>
              저가
              {low_price.toLocaleString()}
            </p>
          </div>
          <div>
            <p>
              거래량(24H)
              {acc_trade_volume_24h}
            </p>
            <p>
              거래대금(24H)
              {convertAccTradePrice(acc_trade_price_24h).toLocaleString()}
              백만
            </p>
          </div>
        </div>
      </div>
      {/* <CoinCharts /> */}
    </Article>
  );
};

const S = {
  CoinName: styled.h3<CoinNameStyleProps>`
    background-image: ${({ market }) =>
      `url('https://static.upbit.com/logos/${market}.png')`};
    margin: 0;
    font-size: 2rem;
    padding: 0.5rem 0.5rem 0.5rem 2.5rem;
    background-size: 1.8rem;
    background-repeat: no-repeat;
    background-position: 0;
  `,
  CoinCode: styled.span`
    font-size: 1rem;
    margin-left: 0.8rem;
    font-weight: 400;
  `,
};

export default React.memo(CoinSummary);
