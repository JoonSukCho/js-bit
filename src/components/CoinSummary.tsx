import { createSelector } from '@reduxjs/toolkit';
import React, { useEffect, useMemo, useRef } from 'react';
import { RootState, useAppSelector } from 'store/config';
import styled, { css } from 'styled-components';
import Article from './Article';
import CoinCharts from 'components/CoinCharts';
import {
  getFontColorClass,
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
            trade_price,
            change,
            change_rate,
            change_price,
          } = selectedRtmSummary;

          const literal = changeLiteral(change);
          const changeRate = convertChangeRate(change_rate);
          const fontColorClass = getFontColorClass(literal);

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
              <S.CoinSummaryContainer>
                <S.CoinChangeSummary>
                  <div>
                    <S.TradePrice className={fontColorClass}>
                      {trade_price.toLocaleString()}
                    </S.TradePrice>
                    <S.TradeUnit className={fontColorClass}>KRW</S.TradeUnit>
                  </div>
                  <div>
                    <S.Change>전일대비</S.Change>
                    <S.ChangeRate
                      className={fontColorClass}
                    >{`${literal} ${changeRate}%`}</S.ChangeRate>
                    <S.ChangePrice className={fontColorClass}>{`${
                      literal === '+' ? '▲' : '▼'
                    } ${change_price.toLocaleString()}`}</S.ChangePrice>
                  </div>
                </S.CoinChangeSummary>
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
              </S.CoinSummaryContainer>
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
  CoinSummaryContainer: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid #d4d6dc;
    padding: 18px 20px 14px;
  `,
  CoinChangeSummary: styled.div`
    display: flex;
    flex-direction: column;
  `,
  TradePrice: styled.span`
    font-size: 2rem;
    font-weight: 500;
  `,
  TradeUnit: styled.span`
    margin-left: 2px;
  `,
  Change: styled.span`
    font-size: 0.82rem;
    margin-right: 4px;
    color: #666666;
  `,
  ChangeRate: styled.span`
    font-size: 1rem;
  `,
  ChangePrice: styled.span`
    font-size: 1rem;
    margin-left: 6px;
  `,
};

export default React.memo(CoinSummary);
