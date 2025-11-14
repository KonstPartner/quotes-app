import { useRef } from 'react';

const useScrollIntoView = <Args extends unknown[] = []>(
  callback?: (...args: Args) => void
) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleScroll = (...args: Args) => {
    callback?.(...args);

    if (ref.current) {
      ref.current.scrollIntoView({
        block: 'start',
      });
    }
  };

  return { ref, handleScroll };
};

export default useScrollIntoView;
