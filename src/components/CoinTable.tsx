import React, { useEffect } from 'react';
import { useAppSelector } from 'store/config';
import { marketListSelector } from 'store/slices/marketSlice';
import styled from 'styled-components';
import Article from './Article';
import CoinRow from './CoinRow';

const CoinTable = () => {
  const {
    data: marketList,
    loadMarketListLoading,
    loadMarketListDone,
  } = useAppSelector(marketListSelector);

  return (
    <S.Container>
      {loadMarketListLoading ? (
        <div>Loading...</div>
      ) : (
        <Table>
          <thead>
            <tr>
              <THeadth>한글명</THeadth>
              <THeadth>현재가</THeadth>
              <THeadth>전일대비</THeadth>
              <THeadth>거래대금</THeadth>
            </tr>
          </thead>
          <tbody>
            {marketList.map((market) => (
              <CoinRow
                key={market.market}
                market={market.market}
                korean_name={market.korean_name}
                english_name={market.english_name}
              />
            ))}
          </tbody>
        </Table>
      )}
    </S.Container>
  );
};

const S = {
  Container: styled(Article)`
    width: 100%;
    height: 100%;
    overflow: auto;
    border: 1px solid green;

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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const THeadth = styled.th`
  background-color: #eeeeee;
  position: sticky;
  top: 0px;
`;

export default React.memo(CoinTable);
