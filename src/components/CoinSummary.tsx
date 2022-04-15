import { createSelector } from '@reduxjs/toolkit';
import React from 'react';
import { RootState, useAppSelector } from 'store/config';
import styled from 'styled-components';
import Article from './Article';

const CoinSummary = () => {
  const { korean_name, market } = useAppSelector(
    (state) => state.market.selectedMarket,
  );

  return (
    <Article>
      <S.CoinName>
        {korean_name}
        <S.CoinCode>{market}</S.CoinCode>
      </S.CoinName>
    </Article>
  );
};

const S = {
  CoinName: styled.h3`
    background-image: url('https://static.upbit.com/logos/KNC.png');
    margin: 0;
    font-size: 2rem;
    padding-left: 2.5rem;
    background-size: 1.8rem;
    background-repeat: no-repeat;
    background-position: 0;
  `,
  CoinCode: styled.span`
    font-size: 1rem;
    margin-left: 0.8rem;
  `,
};

export default React.memo(CoinSummary);
