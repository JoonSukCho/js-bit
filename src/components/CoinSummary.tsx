import React from 'react';
import styled from 'styled-components';

const CoinSummary = () => {
  return (
    <Container>
      <CoinName>
        ABCDE<CoinCode>ABC-DEF</CoinCode>
      </CoinName>
    </Container>
  );
};

const Container = styled.div`
  padding-bottom: 1rem;
  border-bottom: 1px solid #d9d9d9;
`;

const CoinName = styled.h3`
  background-image: url('https://static.upbit.com/logos/KNC.png');
  margin: 0;
  font-size: 2rem;
  padding-left: 2.5rem;
  background-size: 1.8rem;
  background-repeat: no-repeat;
  background-position: 0;
`;

const CoinCode = styled.span`
  font-size: 1rem;
  margin-left: 0.8rem;
`;

export default CoinSummary;
