import React from 'react';
import styled, { css } from 'styled-components';

const CoinOrderListItem = () => {
  return (
    <S.Container>
      <SE.BidVolume>asdas</SE.BidVolume>
      <SE.Price>123213</SE.Price>
      <SE.AskVolume>1231</SE.AskVolume>
    </S.Container>
  );
};

export default CoinOrderListItem;

const S = {
  Container: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    cursor: pointer;
    font-size: 0.82rem;
    border-bottom: 1px solid #f1f1f4;

    &:hover {
      background-color: rgba(167, 182, 255, 0.2);
    }
  `,

  ListItem: styled.div`
    display: table-cell;
    padding: 0.75rem 1rem;
    text-align: center;
  `,
};

const SE = {
  // 매수량
  BidVolume: styled(S.ListItem)``,
  // 가격
  Price: styled(S.ListItem)``,
  //  매도량
  AskVolume: styled(S.ListItem)``,
};
