import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <St.Footer>
      <St.Title>Footer</St.Title>
    </St.Footer>
  );
};

const St = {
  Footer: styled.footer`
    height: 60px;
    background-color: #ffffff;
  `,
  Title: styled.h2`
    color: #999999;
    margin: 0;
  `,
};

export default Footer;
