import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/config';
import { rtmOrderbookActions } from 'store/slices/rtmOrderbookSlice';
import styled from 'styled-components';
import Article from './Article';
import CoinOrderListItem from './CoinOrderListItem';

const CoinOrderList = () => {
  const dispatch = useAppDispatch();
  const selectedMarket = useAppSelector(
    (state) => state.market.selectedMarket.market,
  );

  const { rtmOrderbook, isConnected } = useAppSelector(
    (state) => state.rtmOrderbook,
  );

  // 선택한 마켓 정보로 호가 정보 조회
  useEffect(() => {
    if (selectedMarket) {
      dispatch(
        rtmOrderbookActions.startConnect({
          codes: [selectedMarket],
        }),
      );
    }

    // 선택한 마켓 정보가 변경 되면 소켓 연결을 끊고 새로 연결한다.
    return () => {
      dispatch(rtmOrderbookActions.stopConnect());
    };
  }, [selectedMarket]);

  return (
    <S.Container>
      <S.List>
        <S.ListHeader>
          <S.ListHeaderItem>일반호가</S.ListHeaderItem>
        </S.ListHeader>
        <S.ListBody>
          {!isConnected && <div>Loading...</div>}
          {isConnected &&
            [...rtmOrderbook.orderbook_units]
              .reverse()
              .map((orderbook, idx) => {
                return (
                  <CoinOrderListItem
                    key={String(idx)}
                    {...orderbook}
                    type="ask"
                  />
                );
              })}
          {isConnected &&
            rtmOrderbook.orderbook_units.map((orderbook, idx) => {
              return (
                <CoinOrderListItem
                  key={String(idx)}
                  {...orderbook}
                  type="bid"
                />
              );
            })}
        </S.ListBody>
      </S.List>
    </S.Container>
  );
};

export default CoinOrderList;

const S = {
  Container: styled.div`
    height: 755px;
  `,
  List: styled(Article)`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: #fff;
  `,
  ListHeader: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    font-size: 1.1rem;
    color: #333;
    font-weight: 500;
    border-bottom: 1px solid #ddd;
  `,
  ListHeaderItem: styled.div`
    display: table-cell;
    padding: 0.75rem 1rem;
    text-align: center;
  `,
  ListBody: styled.div`
    width: 100%;
    height: 705px;
    overflow: auto;

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
};
