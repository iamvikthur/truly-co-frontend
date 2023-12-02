import { useState, useEffect } from 'react';
import useResize from './useResize';

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [W, H] = useResize();

  useEffect(() => {
    const { matchMedia } = window;
    const query = '(max-width: 767.98px)';
    const mobile = matchMedia ? matchMedia(query).matches : W < 768;

    if (isMobile !== mobile) {
      setIsMobile(mobile);
    }
  }, [W, H, isMobile]);

  return isMobile;
};

export default useMobile;
