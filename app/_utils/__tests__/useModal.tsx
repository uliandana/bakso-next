import React from 'react';
import { describe, expect, jest, test } from '@jest/globals';
import useModal from '../useModal';

describe('./_utils/useModal', () => {
  test('return modal value & call intercept function', () => {
    jest.spyOn(React, 'useState');
    const setModal = jest.fn();
    (React.useState as jest.Mock).mockImplementation(v => [v, setModal]);

    const [modal, intercept] = useModal('OPEN');
    expect(modal).toBe('OPEN');
    intercept('OPEN-2');
    expect(setModal).lastCalledWith('OPEN-2');
  });

  test('call intercept function without param (close modal with fading by timeout)', () => {
    jest.spyOn(React, 'useState');
    const setModal = jest.fn();
    (React.useState as jest.Mock).mockImplementation(v => [v, setModal]);

    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');

    const [_, intercept] = useModal('OPEN');
    intercept('');
    expect(setModal).lastCalledWith('_FADING_');
    jest.runAllTimers();
    expect(setModal).lastCalledWith('');
  });
});
