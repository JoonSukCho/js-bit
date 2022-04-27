import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MarketItem } from 'services/types/market';
import {
  RealtimeMarketTicker,
  RealtimeMarketTickerList,
} from 'services/types/realtimeMarket';
import { useAppDispatch, useAppSelector } from 'store/config';
import { marketActions, marketListSelector } from 'store/slices/marketSlice';
import { rtmOrderbookActions } from 'store/slices/rtmOrderbookSlice';
import { rtmTickerActions } from 'store/slices/rtmTickerSlice';
import styled, { css } from 'styled-components';
import {
  changeLiteral,
  convertAccTradePrice,
  convertChangeRate,
} from 'utils/market';

interface SContainerStyleProps {
  isSelected: boolean;
}

interface SListItemStyleProps {
  align?: string;
  literal?: string;
}

const CoinListItem = ({
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
    // 선택한 마켓 정보 저장
    dispatch(
      marketActions.setSelectMarket({
        market: code,
        korean_name,
        english_name,
      }),
    );
  }, []);

  return (
    <S.Container onClick={selectMarket} isSelected={selectedMarket === code}>
      <SE.KoreanName align="left">{korean_name}</SE.KoreanName>
      <SE.TradePrice literal={literal}>
        {trade_price.toLocaleString()}
      </SE.TradePrice>
      <SE.Change literal={literal}>{`${literal} ${changeRate}%`}</SE.Change>
      <SE.AccTradePrice>
        {convertAccTradePrice(acc_trade_price_24h).toLocaleString()}
        <S.PriceUnit>백만</S.PriceUnit>
      </SE.AccTradePrice>
    </S.Container>
  );
};

const S = {
  Container: styled.div<SContainerStyleProps>`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    cursor: pointer;
    font-size: 0.8rem;
    border-bottom: 1px solid #f1f1f4;

    &:hover {
      background-color: #f4f5f8;
    }

    ${({ isSelected }) =>
      isSelected &&
      css`
        background-color: #f4f5f8;
      `}
  `,

  ListItem: styled.div<SListItemStyleProps>`
    display: table-cell;
    padding: 0.75rem 1rem;
    text-align: ${({ align }) => align || 'right'};
  `,

  PriceUnit: styled.span`
    color: #999;
    font-size: 0.8rem;
  `,
};

const SE = {
  KoreanName: styled(S.ListItem)`
    font-weight: 500;
  `,
  TradePrice: styled(S.ListItem)`
    color: ${({ literal }) => (literal === '+' ? '#c84a31' : '#1261c4')};
  `,
  Change: styled(S.ListItem)`
    color: ${({ literal }) => (literal === '+' ? '#c84a31' : '#1261c4')};
  `,
  AccTradePrice: styled(S.ListItem)``,
};

export default React.memo(CoinListItem);
