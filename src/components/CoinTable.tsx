import React, { useCallback, useEffect, useMemo } from 'react';
import { useAppSelector } from 'store/config';
import { marketListSelector } from 'store/slices/marketSlice';
import styled from 'styled-components';
import Article from './Article';
import CoinRow from './CoinRow';

const CoinTable = () => {
  const { marketList, loadMarketListLoading, loadMarketListDone } =
    useAppSelector(marketListSelector);

  const realtimeMarketTickerList = useAppSelector(
    (state) => state.realtimeMarket.realtimeMarketTickerList,
  );
  const isConnected = useAppSelector(
    (state) => state.realtimeMarket.isConnected,
  );

  const sortedRealtimeMarketTickerList = useMemo(() => {
    if (isConnected) {
      return [...realtimeMarketTickerList].sort(
        (a, b) => b.acc_trade_price_24h - a.acc_trade_price_24h,
      );
    }

    return realtimeMarketTickerList;
  }, [realtimeMarketTickerList, isConnected]);

  return (
    <S.Container>
      <S.Table>
        <S.TableHeader>
          <S.TableCell>한글명</S.TableCell>
          <S.TableCell>현재가</S.TableCell>
          <S.TableCell>전일대비</S.TableCell>
          <S.TableCell>거래대금</S.TableCell>
        </S.TableHeader>
        <div style={{ overflow: 'auto', height: 705, width: '100%' }}>
          {sortedRealtimeMarketTickerList.map((ticker) => (
            <CoinRow key={ticker.code} {...ticker} />
          ))}
        </div>
      </S.Table>
    </S.Container>
  );
};

const S = {
  Container: styled(Article)`
    width: 100%;
    height: 100%;
    max-width: 420px;
    box-sizing: border-box;
    background: #fff;
    padding: 1rem 0;

    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
    &::-webkit-scrollbar-track-piece {
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background-color: #d9d9d9;
    }
    &::-webkit-scrollbar-button:start {
      background-color: transparent;
    }
    &::-webkit-scrollbar-button:end {
      background-color: transparent;
    }
  `,
  Table: styled.div``,
  TableHeader: styled.div`
    display: flex;
    padding: 0.8rem 0;
    text-align: center;
  `,
  TableRow: styled.div`
    display: table-row;
  `,
  TableCell: styled.div`
    display: table-cell;
    padding: 0.75rem 1rem;
  `,
};

export default React.memo(CoinTable);
