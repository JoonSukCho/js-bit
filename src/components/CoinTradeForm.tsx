import useInput from 'Hooks/useInputs';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

interface Inputs {
  price: number;
  count: number;
  total: number;
}

const CoinTradeForm = () => {
  const [inputs, setInputs] = useInput<Inputs>({
    price: 0,
    count: 0,
    total: 0,
  });
  const { price, count, total } = inputs;

  return (
    <S.Form>
      <S.FormControl>
        <S.Label>labels</S.Label>
        <S.InputContainer>
          <S.Input name="price" value={price} onChange={setInputs} />
        </S.InputContainer>
      </S.FormControl>
      <S.FormControl>
        <S.Label>labels</S.Label>
        <S.InputContainer>
          <S.Input name="count" value={count} onChange={setInputs} />
        </S.InputContainer>
      </S.FormControl>
      <S.FormControl>
        <S.Label>labels</S.Label>
        <S.InputContainer>
          <S.Input name="total" value={total} onChange={setInputs} />
        </S.InputContainer>
      </S.FormControl>
      <S.ButtonContainer>
        <S.Button type="button">wa</S.Button>
      </S.ButtonContainer>
    </S.Form>
  );
};

const S = {
  Form: styled.div`
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    padding: 0.75rem 1rem;
  `,
  FormControl: styled.div`
    display: inline-flex;
    flex-direction: column;
    vertical-align: top;
    position: relative;
    margin: 8px;
  `,
  Label: styled.label`
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.4375em;
    letter-spacing: 0.00938em;
    padding: 0px;
    display: block;
    transform-origin: left top;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 133%;
    position: absolute;
    left: 0px;
    top: 0px;
    transform: translate(0px, -1.5px) scale(0.75);
    transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
      transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
      max-width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  `,
  InputContainer: styled.div`
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.4375em;
    letter-spacing: 0.00938em;
    color: rgba(0, 0, 0, 0.87);
    box-sizing: border-box;
    cursor: text;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    margin-top: 16px;

    &::before {
      border-bottom: 1px solid rgba(0, 0, 0, 0.42);
      left: 0px;
      bottom: 0px;
      content: ' ';
      position: absolute;
      right: 0px;
      transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      pointer-events: none;
    }
  `,
  Input: styled.input`
    font: inherit;
    letter-spacing: inherit;
    color: currentColor;
    padding: 4px 0 5px;
    border: 0;
    box-sizing: content-box;
    background: none;
    height: 1.4375em;
    margin: 0;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    display: block;
    min-width: 0;
    width: 100%;
    -webkit-animation-name: mui-auto-fill-cancel;
    animation-name: mui-auto-fill-cancel;
    -webkit-animation-duration: 10ms;
    animation-duration: 10ms;
  `,
  ButtonContainer: styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  `,
  Button: styled.button`
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1.1rem;
    font-weight: 500;
    color: #333;
    margin: 0;
    text-align: center;
    background-color: #fff;
    border: 0;
    cursor: pointer;

    &:hover {
      background-color: #f5f5f5;
      transition: ease 0.3s background-color;
    }
  `,
};

export default React.memo(CoinTradeForm);
