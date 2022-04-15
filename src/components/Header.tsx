import React from 'react';
import styled from 'styled-components';
import ApiTest from './ApiTest';

const Header = () => {
  return (
    <St.Header>
      <ApiTest />
    </St.Header>
  );
};

const St = {
  Header: styled.header`
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: #093687;
    height: 60px;
  `,
};

export default Header;
