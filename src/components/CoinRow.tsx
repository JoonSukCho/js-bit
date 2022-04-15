import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MarketItem } from 'services/types/market';
import { useAppDispatch, useAppSelector } from 'store/config';
import { marketActions } from 'store/slices/marketSlice';
import { realtimeMarketEqualityFn } from 'store/slices/realtimeMarketSlice';
import styled, { css } from 'styled-components';
import {
  changeLiteral,
  convertAccTradePrice,
  convertChangeRate,
} from 'utils/market';

interface SCoinRowStyleProps {
  isSelected: boolean;
}

const CoinRow = ({ market, korean_name, english_name }: MarketItem) => {
  const dispatch = useAppDispatch();

  const { data: realtimeData, isConnected } = useAppSelector(
    (state) => state.realtimeMarket,
    (prev) => realtimeMarketEqualityFn(prev, market),
  );

  const selectedMarket = useAppSelector(
    (state) => state.market.selectedMarket.market,
  );

  const selectMarket = useCallback(() => {
    dispatch(
      marketActions.setSelectMarket({ market, korean_name, english_name }),
    );
  }, []);

  const literal = useMemo(
    () => changeLiteral(realtimeData.change),
    [realtimeData.change],
  );
  const changeRate = useMemo(
    () => convertChangeRate(realtimeData.change_rate),
    [realtimeData.change_rate],
  );

  return (
    <S.CoinRow onClick={selectMarket} isSelected={selectedMarket === market}>
      {!isConnected ? (
        <>
          <S.CoinCell>loading...</S.CoinCell>
        </>
      ) : (
        <>
          <S.CoinCell>{korean_name}</S.CoinCell>
          <S.CoinCell>{realtimeData.trade_price.toLocaleString()}</S.CoinCell>
          <S.CoinCell>{`${literal} ${changeRate}%`}</S.CoinCell>
          <S.CoinCell>
            {convertAccTradePrice(
              realtimeData.acc_trade_price_24h,
            ).toLocaleString()}
            백만
          </S.CoinCell>
        </>
      )}
    </S.CoinRow>
  );
};

const S = {
  CoinRow: styled.tr<SCoinRowStyleProps>`
    cursor: pointer;
    &:hover {
      background-color: rgba(167, 182, 255, 0.2);
    }

    ${({ isSelected }) =>
      isSelected &&
      css`
        font-weight: bold;
        background-color: rgba(167, 182, 255, 0.5);
      `}
  `,

  CoinCell: styled.td`
    padding: 0.75rem 1rem;
  `,
};

export default React.memo(CoinRow);
