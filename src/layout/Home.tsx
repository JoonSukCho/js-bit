import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Article from 'components/Article';
import CoinList from 'components/CoinList';
import CoinSummary from 'components/CoinSummary';
import CoinOrderList from 'components/CoinOrderList';
import CoinTrade from 'components/CoinTrade';

const Home = () => {
  return (
    <>
      <Header />
      <S.Container>
        <S.CoinDetailSection>
          <CoinSummary />
          <S.CoinOrderContainer>
            <CoinOrderList />
            <CoinTrade />
          </S.CoinOrderContainer>
        </S.CoinDetailSection>
        <S.CoinListSection>
          <CoinList />
        </S.CoinListSection>
      </S.Container>
      <Footer />
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
    min-height: 1200px;
  `,
  CoinListSection: styled.section`
    position: sticky;
    height: 780px;
    top: 88px; // Container의 margin-top + padding-top

    @media (max-width: 1024px) {
      position: static;
    }
  `,
  CoinOrderContainer: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    margin-bottom: 10px;

    @media (max-width: 1024px) {
      display: flex;
      flex-direction: column;
    }
  `,
};

export default Home;
