import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MarketItem } from 'services/types/market';
import {
  RealtimeMarketTicker,
  RealtimeMarketTickerList,
} from 'services/types/realtimeMarket';
import { useAppDispatch, useAppSelector } from 'store/config';
import { marketActions, marketListSelector } from 'store/slices/marketSlice';
import styled, { css } from 'styled-components';
import {
  changeLiteral,
  convertAccTradePrice,
  convertChangeRate,
} from 'utils/market';

interface SCoinRowStyleProps {
  isSelected: boolean;
}

const CoinRow = ({
  code,
  change,
  change_rate,
  trade_price,
  acc_trade_price_24h,
}: RealtimeMarketTicker) => {
  const dispatch = useAppDispatch();
  const { marketList } = useAppSelector(marketListSelector);
  const selectedMarket = useAppSelector(
    (state) => state.market.selectedMarket.market,
  );

  const { korean_name, english_name } = useMemo(
    () => marketList.filter((market) => market.market === code)[0],
    [code],
  );
  const literal = useMemo(() => changeLiteral(change), [change]);
  const changeRate = useMemo(
    () => convertChangeRate(change_rate),
    [change_rate],
  );

  const selectMarket = useCallback(() => {
    dispatch(
      marketActions.setSelectMarket({
        market: code,
        korean_name,
        english_name,
      }),
    );
  }, []);

  return (
    <S.TableRow onClick={selectMarket} isSelected={selectedMarket === code}>
      <S.TableCell>{korean_name}</S.TableCell>
      <S.TableCell>{trade_price.toLocaleString()}</S.TableCell>
      <S.TableCell>{`${literal} ${changeRate}%`}</S.TableCell>
      <S.TableCell>
        {convertAccTradePrice(acc_trade_price_24h).toLocaleString()}
        백만
      </S.TableCell>
    </S.TableRow>
  );
};

const S = {
  TableRow: styled.div<SCoinRowStyleProps>`
    display: table-row;
    cursor: pointer;
    font-size: 0.78rem;

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

  TableCell: styled.div`
    display: table-cell;
    padding: 0.75rem 1rem;
  `,
};

export default React.memo(CoinRow);
