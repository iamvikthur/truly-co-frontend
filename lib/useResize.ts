import { useState, useEffect } from 'react';

const useResize = () => {
  const initial = typeof window === 'undefined' ? [0, 0] : [window.innerWidth, window.innerHeight];
  const [size, setSize] = useState(initial);

  useEffect(() => {
    function handleResize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

export default useResize;
