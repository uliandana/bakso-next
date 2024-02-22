import { useState } from 'react';

export default function useModal<T>(props: T) {
  const [modal, setModal] = useState<T | '_FADING_'>(props);

  const intercept = (param: T) => {
    if (param) {
      setModal(param);
    } else {
      setModal('_FADING_');
      setTimeout(() => {
        setModal(param);
      }, 250);
    }
  };

  return [modal, intercept];
}
