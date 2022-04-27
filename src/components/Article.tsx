import React from 'react';
import styled from 'styled-components';

interface ArticleProps {
  children: React.ReactNode;
}

const Article = React.forwardRef(
  (
    { children, ...rest }: ArticleProps,
    ref: React.RefObject<HTMLDivElement>,
  ) => {
    return (
      <S.Article ref={ref} {...rest}>
        {children}
      </S.Article>
    );
  },
);

const S = {
  Article: styled.article`
    margin-bottom: 8px;
    background-color: #ffffff;
    box-shadow: 2px 2px 4px #dee1e7;
  `,
};

export default Article;
