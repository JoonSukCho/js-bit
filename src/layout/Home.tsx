import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import CoinTable from 'components/CoinTable';
import CoinSummary from 'components/CoinSummary';
import CoinCharts from 'components/CoinCharts';
import CoinQuote from 'components/CoinQuote';
import CoinTrade from 'components/CoinTrade';

const Home = () => {
  const [code, setCode] = useState('');

  useEffect(() => {
    axios.get('https://api.upbit.com/v1/market/all').then((res) => {
      const data = res.data;

      const ws = new WebSocket('wss://api.upbit.com/websocket/v1');
      const marketList = data
        .filter((list) => list.market.includes('KRW-'))
        .map((list) => list.market);

      const krMarketList = data.filter((list) => list.market.includes('KRW-'));

      ws.onopen = () => {
        ws.send(
          `[{"ticket":"test"},{"type":"ticker","codes": ${JSON.stringify(
            marketList,
          )}}]`,
        );
      };

      ws.onmessage = async (e) => {
        const { data } = e;
        const text = await new Response(data).text();
        const parsedData = JSON.parse(text);
        // setCode(parsedData.code);
      };

      ws.onerror = (e) => {
        console.log(e);
      };
    });
  }, []);

  return (
    <Container>
      <CoinDetailSection>
        <CoinSummary />
        <CoinCharts />
        <CoinOrder>
          <CoinQuote />
          <CoinTrade />
        </CoinOrder>
      </CoinDetailSection>
      <CoinListSection>
        <CoinTable />
      </CoinListSection>
    </Container>
  );
};

const Container = styled.div`
  height: calc(100vh - 100px);
  padding: 16px;

  display: grid;
  grid-gap: 16px;
  grid-template-columns: 2fr 1fr;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const CoinDetailSection = styled.div`
  height: 100%;
  border: 1px solid red;

  display: grid;
  grid-template-rows: auto 2fr 1fr;
`;

const CoinOrder = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const CoinListSection = styled.div`
  height: 100%;

  border: 1px solid blue;
`;

export default Home;
