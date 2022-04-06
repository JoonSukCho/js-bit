import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Coin = () => {
  const [code, setCode] = useState('');

  useEffect(() => {
    axios.get('https://api.upbit.com/v1/market/all').then((res) => {
      const data = res.data;

      const ws = new WebSocket('wss://api.upbit.com/websocket/v1');
      const marketList = data
        .filter((list) => list.market.includes('KRW-'))
        .map((list) => list.market);

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
        setCode(parsedData.code);
      };

      ws.onerror = (e) => {
        console.log(e);
      };
    });
  }, []);

  return <div>{code}</div>;
};

export default Coin;
