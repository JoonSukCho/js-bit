import Account from './Account';
import { render } from '@testing-library/react';

it('matches snapshot', () => {
  const utils = render(<Account name="chojs" mbti="isfj" />);

  // 컴포넌트를 수정했을 때 기존 스냅샷과 비교해
  // 원하는 방식으로 렌더링되는지 비교하는 테스트
  expect(utils.container).toMatchSnapshot();
});

it('shows the props correctly', () => {
  const utils = render(<Account name="chojs" mbti="isfj" />);

  // 특정 문구가 있는지 확인하는 테스트
  utils.getByText('chojs');
  utils.getByText('isfj');
});
