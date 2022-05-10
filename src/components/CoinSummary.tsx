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

  const selectedMarketCode = useMemo(
    () => selectedMarket.split('-')[1],
    [selectedMarket],
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
                  src={`https://static.upbit.com/logos/${selectedMarketCode}.png`}
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
                <S.CoinPriceSummary>
                  <div>
                    <S.SummaryArea>
                      고가
                      <S.HighPrice>{high_price.toLocaleString()}</S.HighPrice>
                    </S.SummaryArea>
                    <S.SummaryArea>
                      저가
                      <S.LowPrice>{low_price.toLocaleString()}</S.LowPrice>
                    </S.SummaryArea>
                  </div>
                  <S.SummaryAreaRightSide>
                    <S.SummaryArea>
                      거래량(24H)
                      <S.AccTradeVolume>
                        {acc_trade_volume_24h.toLocaleString(undefined, {
                          maximumFractionDigits: 3,
                        })}
                        <S.Suffix>{selectedMarketCode}</S.Suffix>
                      </S.AccTradeVolume>
                    </S.SummaryArea>
                    <S.SummaryArea>
                      거래대금(24H)
                      <S.Price>
                        {acc_trade_price_24h.toLocaleString(undefined, {
                          maximumFractionDigits: 3,
                        })}
                        <S.Suffix>KRW</S.Suffix>
                      </S.Price>
                    </S.SummaryArea>
                  </S.SummaryAreaRightSide>
                </S.CoinPriceSummary>
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

    @media (max-width: 1024px) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 1rem 0;
    }
  `,
  CoinChangeSummary: styled.div`
    display: flex;
    flex-direction: column;
  `,
  CoinPriceSummary: styled.div`
    display: grid;
    @media (min-width: 1024px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 1024px) {
      grid-template-rows: 1fr 1fr;
    }
  `,
  SummaryArea: styled.p`
    display: grid;
    grid-template-columns: 1fr 2fr;
    font-size: 0.82rem;
    margin-top: 0;
    margin-bottom: 9px;
    padding-bottom: 9px;

    &:first-child {
      border-bottom: 1px solid #e3e5ec;
    }
  `,
  SummaryAreaRightSide: styled.div`
    @media (min-width: 1024px) {
      margin-left: 20px;
    }
  `,
  AccTradeVolume: styled.span`
    font-size: 0.9rem;
    text-align: right;
  `,
  HighPrice: styled.span`
    font-size: 0.9rem;
    font-weight: 500;
    text-align: right;
    color: #c84a31;
  `,
  LowPrice: styled.span`
    font-size: 0.9rem;
    font-weight: 500;
    text-align: right;
    color: #1261c4;
  `,
  Price: styled.span`
    text-align: right;
    letter-spacing: -0.05em;
  `,
  Suffix: styled.span`
    font-size: 0.75rem;
    color: #999;
    margin-left: 2px;
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
