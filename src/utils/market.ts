// 코인 계산 관련 util 함수

type LiteralType = '+' | '-' | '';

// MA(가격 이동 평균) 계산 함수
export const calculateMA = (dayCount: number, data: number[][]) => {
  let result = [];
  for (let i = 0, len = data.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }
    let sum = 0;
    for (let j = 0; j < dayCount; j++) {
      sum += +data[i - j][1];
    }
    result.push((sum / dayCount).toFixed(2));
  }
  return result;
};

// change에 따라 등호 반전 여부 계산 함수
export const changeLiteral = (change: string): LiteralType => {
  if (change === 'RISE') {
    return '+';
  } else if (change === 'FALL') {
    return '-';
  }

  return '';
};

export const getFontColorClass = (
  change: LiteralType,
): 'text-red' | 'text-blue' | '' => {
  if (change === '+') {
    return 'text-red';
  } else if (change === '-') {
    return 'text-blue';
  }

  return '';
};

// 24시간 거래 대금을 환산하는 함수
export const convertAccTradePrice = (price: number): number => {
  return parseInt((price * 0.000001).toFixed(0), 10);
};

// 전일 대비 등락을 환산하는 함수
export const convertChangeRate = (changeRate: number): string => {
  return (changeRate * 100).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });
};
