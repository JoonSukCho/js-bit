import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Header from 'components/Header';
import Article from 'components/Article';
import CoinList from 'components/CoinList';
import CoinSummary from 'components/CoinSummary';
import CoinQuote from 'components/CoinQuote';
import CoinTrade from 'components/CoinTrade';
import { useAppSelector } from 'store/config';

const Home = () => {
  const isConnected = useAppSelector(
    (state) => state.realtimeMarket.isConnected,
  );

  return (
    <>
      <Header />
      <S.Container>
        <S.CoinDetailSection>
          <CoinSummary />
          <S.CoinOrder>
            <CoinQuote />
            <CoinTrade />
          </S.CoinOrder>
        </S.CoinDetailSection>
        <S.CoinTableSection>
          <CoinList />
        </S.CoinTableSection>
      </S.Container>
      <footer>footer</footer>
    </>
  );
};

const S = {
  Container: styled.div`
    display: grid;
    grid-gap: 8px;
    grid-template-columns: 2fr 1fr;
    margin-top: 72px;
    padding: 16px;

    @media (max-width: 1024px) {
      display: flex;
      flex-direction: column-reverse;
    }
  `,
  CoinDetailSection: styled.section`
    display: grid;
    grid-template-rows: 2fr 1fr;
    min-height: 1200px;
  `,
  CoinTableSection: styled.section`
    position: sticky;
    height: 800px;
    top: 88px; // Container의 margin-top + padding-top

    @media (max-width: 1024px) {
      position: static;
    }
  `,
  CoinOrder: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    margin-bottom: 10px;
  `,
};

export default Home;
