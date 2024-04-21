import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export type Param<T> = {
  setOffset: Dispatch<SetStateAction<number>>,
  data: T,
  attribute: string,
  dynamicAttribute: string,
};

export default function useInfiniteScroll<T>(props: Param<T>) {
  const { setOffset, data, attribute, dynamicAttribute } = props;
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const initialize = () => {
    const options = {
      threshold: 1,
    };
    
    const fnObs = new IntersectionObserver((e) => {
      const { isIntersecting, target } = e[0];
      if (!isIntersecting) {
        return;
      }

      const newOffset = parseInt(target.getAttribute(attribute) ?? '0');
      if (!newOffset) {
        return;
      }
      
      setOffset(newOffset);
    }, options);

    setObserver(fnObs);
  };

  useEffect(() => {
    const target = document.querySelector(dynamicAttribute);
    if (target && observer) {
      observer.observe(target);
    }
  }, [data]);

  return {
    initialize,
    disconnect: observer?.disconnect,
  };
}
