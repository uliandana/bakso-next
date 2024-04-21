import React from 'react';
import { describe, expect, jest, test, beforeEach } from '@jest/globals';
import useInfiniteScroll, { Param } from '../useInfiniteScroll';

type noop = () => {};
type ObsEntry = {
  isIntersecting: boolean,
  target: {
    getAttribute: () => string | null,
  },
}

describe('./_utils/useInfiniteScroll', () => {
  beforeEach(() => {
    jest.spyOn(React, 'useEffect');
    (React.useEffect as jest.Mock).mockImplementation((e) => (e as noop)());

    jest.spyOn(document, 'querySelector');
    (document.querySelector as jest.Mock).mockImplementation(() => 'target');
  });

  test('observer.observe initialized & setOffset called', () => {
    jest.spyOn(React, 'useState');
    const setObserver = jest.fn();
    const dummyObserver = {
      observe: jest.fn(),
    };
    (React.useState as jest.Mock).mockImplementation(() => [dummyObserver, setObserver]);

    function IntersectionObserverMock(e: (entry: ObsEntry[]) => void) {
      const target = {
        getAttribute: () => '100',
      };
      e([{ isIntersecting: true, target }]);
    }

    type MockGlobal = {
      IntersectionObserver: typeof IntersectionObserverMock,
    }
    (global as unknown as MockGlobal).IntersectionObserver = IntersectionObserverMock;

    const props: Param<string> = {
      setOffset: jest.fn(),
      data: '',
      attribute: 'data',
      dynamicAttribute: 'data-100',
    };

    const { initialize } = useInfiniteScroll(props);
    initialize();
    expect(dummyObserver.observe).toBeCalledWith('target');
    expect(props.setOffset).toBeCalledWith(100);
  });

  test('dont call setOffset when not intersecting', () => {
    jest.spyOn(React, 'useState');
    (React.useState as jest.Mock).mockImplementation(() => ['', jest.fn()]);

    function IntersectionObserverMock(e: (entry: ObsEntry[]) => void) {
      const target = {
        getAttribute: () => '100',
      };
      e([{ isIntersecting: false, target }]);
    }

    type MockGlobal = {
      IntersectionObserver: typeof IntersectionObserverMock,
    }
    (global as unknown as MockGlobal).IntersectionObserver = IntersectionObserverMock;

    const props: Param<string> = {
      setOffset: jest.fn(),
      data: '',
      attribute: 'data',
      dynamicAttribute: 'data-100',
    };

    const { initialize } = useInfiniteScroll(props);
    initialize();
    expect(props.setOffset).toBeCalledTimes(0);
  });

  test('dont call setOffset when intersecting but target attribute not found', () => {
    jest.spyOn(React, 'useState');
    (React.useState as jest.Mock).mockImplementation(() => ['', jest.fn()]);

    function IntersectionObserverMock(e: (entry: ObsEntry[]) => void) {
      const target = {
        getAttribute: () => null,
      };
      e([{ isIntersecting: true, target }]);
    }

    type MockGlobal = {
      IntersectionObserver: typeof IntersectionObserverMock,
    }
    (global as unknown as MockGlobal).IntersectionObserver = IntersectionObserverMock;

    const props: Param<string> = {
      setOffset: jest.fn(),
      data: '',
      attribute: 'data',
      dynamicAttribute: 'data-100',
    };

    const { initialize } = useInfiniteScroll(props);
    initialize();
    expect(props.setOffset).toBeCalledTimes(0);
  });
});
