import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'modules';
import { getMarketList } from 'modules/market/actions';

const CoinTrade = () => {
  const { marketList } = useSelector((state: RootState) => state.market);
  console.log(marketList);
  const dispatch = useDispatch();

  const requestMarketList = () => {
    dispatch(getMarketList());
  };

  // const onIncrease = () => {
  //   dispatch(changeNumberRequest());
  // };

  return (
    <div>
      trade
      <button onClick={requestMarketList}>getMarket</button>
    </div>
  );
};

export default CoinTrade;
