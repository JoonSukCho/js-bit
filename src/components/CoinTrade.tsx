import React, { useEffect } from 'react';
import styled from 'styled-components';
import Article from './Article';
import CoinTradeForm from './CoinTradeForm';

const CoinTrade = () => {
  return (
    <S.Container>
      <S.Header>
        <S.HeaderItem className="text-red">at</S.HeaderItem>
        <S.HeaderItem className="text-blue">ad</S.HeaderItem>
      </S.Header>
      <CoinTradeForm />
    </S.Container>
  );
};

const S = {
  Container: styled(Article)`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  `,
  Header: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    color: #333;
    font-size: 1.1rem;
    font-weight: 500;
    border-bottom: 1px solid #ddd;
  `,
  HeaderItem: styled.p`
    padding: 0.75rem 1rem;
    margin: 0;
    text-align: center;
    cursor: pointer;

    &:hover {
      background-color: #f5f5f5;
      transition: ease 0.3s background-color;
    }
  `,
};

export default React.memo(CoinTrade);
