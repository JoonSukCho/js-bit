import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <St.Header>
      <St.Title>JSbit</St.Title>
    </St.Header>
  );
};

const St = {
  Header: styled.header`
    position: fixed;
    display: flex;
    align-items: center;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: #093687;
    height: 60px;
  `,
  Title: styled.h2`
    font-style: italic;
    margin: 0.5rem 0 0.5rem 1rem;
    color: #fff;
  `,
};

export default Header;
