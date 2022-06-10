import {
  calculateMA,
  changeLiteral,
  convertAccTradePrice,
  convertChangeRate,
  getFontColorClass,
} from './market';

describe('Change Literal 함수 테스트', () => {
  test('change Literal', () => {
    expect(changeLiteral('RISE')).toBe('+');
    expect(changeLiteral('FALL')).toBe('-');
    expect(changeLiteral('오타')).toBe('');
  });
});

test('getFontColorClass', () => {
  expect(getFontColorClass('+')).toBe('text-red');
  expect(getFontColorClass('-')).toBe('text-blue');
  expect(getFontColorClass('')).toBe('');
});
