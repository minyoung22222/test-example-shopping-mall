import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

it('input의 className에 css props가 잘 적용된다.', async () => {
  await render(<TextField className={'my-class'} />);

  screen.debug();

  expect(screen.getByPlaceholderText('텍스트를 입력해 주세요.')).toHaveClass(
    'my-class',
  );
});

it('placeholder prop에 따라 placeholder가 변경된다.', async () => {
  await render(<TextField placeholder={'안녕'} />);

  const textInput = screen.getByPlaceholderText('안녕');

  expect(textInput).toBeInTheDocument();
});

it('텍스트를 입력할 때마다 onChange 핸들러가 호출된다.', async () => {
  const spy = vi.fn(); // 특정 함수가 호출되었는지

  const { user } = await render(<TextField onChange={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.type(textInput, 'test'); // keydown event 로 test를 input에 넣음

  expect(spy).toHaveBeenCalledWith('test'); // 함수가 test와 같이 잘 실행이 됐는지
});

it('focus 시 border 스타일 변경', async () => {
  const { user } = await render(<TextField />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.click(textInput);

  expect(textInput).toHaveStyle({
    borderWidth: 2,
    borderColor: 'rgb(25, 118, 210)',
  });
});

it('focus 시 onFocus 핸들러 호출', async () => {
  const spy = vi.fn();
  const { user } = await render(<TextField onFocus={spy} />);
  // 컴포넌트 렌더

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
  // 해당 요소 가져오기

  await user.click(textInput); // click과 연관 -> 포커스, 마우스다운, 마우스업 등
  // 유저 실행
  screen.debug();
  expect(spy).toHaveBeenCalled();
  // 함수가 잘 실행되는지 확인
});

it('Enter 키 입력 시 onEnter 핸들러 호출', async () => {
  const spy = vi.fn();
  const { user } = await render(<TextField onEnter={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.type(textInput, 'test{Enter}');

  expect(spy).toHaveBeenCalledWith('test');
});
