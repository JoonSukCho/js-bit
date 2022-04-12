import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const CoinRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: rgba(167, 182, 255, 0.2);
  }
`;

const CoinCell = styled.td`
  padding: 0.75rem 1rem;
`;

const Contents = () => {
  return (
    <CoinRow
      onClick={() => {
        console.log('click');
      }}
    >
      <CoinCell>ABC</CoinCell>
      <CoinCell>1,000,000</CoinCell>
      <CoinCell>+ 3.05%</CoinCell>
      <CoinCell>3,012,230</CoinCell>
    </CoinRow>
  );
};

const CoinTable = () => {
  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <THeadth>Header 1</THeadth>
            <THeadth>Header 2</THeadth>
            <THeadth>Header 3</THeadth>
            <THeadth>Header 4</THeadth>
          </tr>
        </thead>
        <tbody>
          {new Array(50).fill(0).map((_, idx) => (
            <Contents key={String(idx)} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-height: calc(100vh - 100px);
  overflow: auto;
  border: 1px solid green;

  @media (max-width: 768px) {
    max-height: calc(100vh - 600px);
  }

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
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const THeadth = styled.th`
  background-color: #eeeeee;
  position: sticky;
  top: 0px;
`;

export default CoinTable;
