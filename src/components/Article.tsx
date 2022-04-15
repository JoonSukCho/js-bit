import React from 'react';
import styled from 'styled-components';

interface ArticleProps {
  children: React.ReactNode;
}

const Article = ({ children, ...rest }: ArticleProps) => {
  return <S.Article {...rest}>{children}</S.Article>;
};

const S = {
  Article: styled.article`
    margin-bottom: 8px;
    background-color: #ffffff;
  `,
};

export default Article;
