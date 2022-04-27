import { createSelector } from '@reduxjs/toolkit';
import React, { useEffect, useMemo, useRef } from 'react';
import { RootState, useAppSelector } from 'store/config';
import styled from 'styled-components';
import Article from './Article';
import CoinCharts from 'components/CoinCharts';
import {
  changeLiteral,
  convertAccTradePrice,
  convertChangeRate,
} from 'utils/market';
import { selectedRtmSummarySelector } from 'store/slices/rtmTickerSlice';
import { shallowEqual } from 'react-redux';

interface CoinNameStyleProps {
  market: string;
}

const CoinSummary = () => {
  const CoinSummaryRef = useRef<HTMLDivElement>(null);

  const { korean_name, market: selectedMarket } = useAppSelector(
    (state) => state.market.selectedMarket,
  );

  const isConnected = useAppSelector((state) => state.rtmTicker.isConnected);
  const selectedRtmSummary = useAppSelector(
    selectedRtmSummarySelector,
    shallowEqual,
  );

  useEffect(() => {
    const $CoinSummary = CoinSummaryRef.current;

    if ($CoinSummary) {
      $CoinSummary.addEventListener('resize', (e) => {
        console.log('resize');
      });

      console.log($CoinSummary.offsetTop);
    }

    return () => {
      console.log('clean up');
    };
  }, [CoinSummaryRef]);

  return (
    <Article ref={CoinSummaryRef}>
      {!isConnected ? (
        <div>Loading...</div>
      ) : (
        (() => {
          const {
            high_price,
            low_price,
            acc_trade_price_24h,
            acc_trade_volume_24h,
          } = selectedRtmSummary;

          return (
            <>
              <S.CoinNameContainer>
                <S.CoinImg
                  src={`https://static.upbit.com/logos/${
                    selectedMarket.split('-')[1]
                  }.png`}
                />
                <S.CoinName>{korean_name}</S.CoinName>
                <S.CoinCode>{selectedMarket}</S.CoinCode>
              </S.CoinNameContainer>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  borderBottom: '1px solid #d4d6dc',
                  padding: '18px 20px 14px',
                }}
              >
                <div>
                  <p>123</p>
                </div>
                <div
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}
                >
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
                      {convertAccTradePrice(
                        acc_trade_price_24h,
                      ).toLocaleString()}
                      백만
                    </p>
                  </div>
                </div>
              </div>
              <CoinCharts />
            </>
          );
        })()
      )}
    </Article>
  );
};

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
  `,
  CoinImg: styled.img`
    vertical-align: middle;
    max-width: 30px;
    max-height: 30px;
  `,
  CoinNameContainer: styled.div`
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    border-bottom: 1px solid #d4d6dc;
  `,
  CoinName: styled.span`
    padding-left: 8px;
    font-weight: 600;
    font-size: 1.4rem;
  `,
  CoinCode: styled.span`
    padding-top: 8px;
    font-size: 0.8rem;
    color: #666;
    margin-left: 0.125rem;
    font-weight: 400;
  `,
};

export default React.memo(CoinSummary);
