import React, { useMemo } from 'react';
import { OrderbookUnit } from 'services/types/market';
import styled, { css } from 'styled-components';

interface OrderBookUnitWithType extends OrderbookUnit {
  type: 'bid' | 'ask';
}

interface ListItemCellStyleProps {
  align: string;
  type: 'bid' | 'ask';
}

const CoinOrderListItem = ({
  bid_size,
  bid_price,
  ask_size,
  ask_price,
  type,
}: OrderBookUnitWithType) => {
  const toFixedAskSize = useMemo(() => ask_size.toFixed(3), [ask_size]);
  const toFixedBidSize = useMemo(() => bid_size.toFixed(3), [bid_size]);
  const askPrice = useMemo(() => ask_price, [ask_price]);
  const bidPrice = useMemo(() => bid_price, [bid_price]);

  return (
    <S.Container>
      <SE.AskVolume type={type} align="right">
        {type === 'ask' && toFixedAskSize}
      </SE.AskVolume>
      <SE.Price type={type} align="center">
        {type === 'bid' ? bidPrice.toLocaleString() : askPrice.toLocaleString()}
      </SE.Price>
      <SE.BidVolume type={type} align="left">
        {type === 'bid' && toFixedBidSize}
      </SE.BidVolume>
    </S.Container>
  );
};

export default CoinOrderListItem;

const S = {
  Container: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    cursor: pointer;
    font-size: 0.8rem;

    &:hover {
      background-color: #f4f5f8;
    }
  `,

  ListItem: styled.div<ListItemCellStyleProps>`
    display: table-cell;
    padding: 0.75rem 1rem;
    text-align: center;

    border-top: 1px solid #fff;
    border-right: 1px solid #fff;

    text-align: ${({ align }) => align};
  `,
};

const SE = {
  // 매도잔량
  AskVolume: styled(S.ListItem)`
    ${({ type }) =>
      type === 'ask' &&
      css`
        background-color: rgba(18, 97, 196, 0.08);
      `}
  `,
  // 매수/매도가
  Price: styled(S.ListItem)`
    font-size: 0.83rem;
    font-weight: 500;
    background-color: ${({ type }) =>
      type === 'ask' ? 'rgba(18,97,196,.08)' : 'rgba(200,74,49,.08)'};
  `,
  // 매수잔량
  BidVolume: styled(S.ListItem)`
    ${({ type }) =>
      type === 'bid' &&
      css`
        background-color: rgba(200, 74, 49, 0.08);
      `}
  `,
};
