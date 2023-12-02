import { useRef, useState, useEffect, MouseEvent, useCallback } from 'react';
import useSWR from 'swr';
import { useSpring, animated } from 'react-spring';
import { fetcher } from '../../lib/fetcher';
import useResize from '../../lib/useResize';
import { Brand } from '../../lib/models';
import { BrandButton, BrandSelectorWrapper } from './BrandSelector.styles';

const BrandSelector = ({ brand, onChange }) => {
  const { data } = useSWR(`/api/brands`, fetcher, { suspense: true });
  const [offset, setOffset] = useState(0);
  const refAll = useRef(null);
  const [W, H] = useResize();
  const mobile = W < 768;
  const length = mobile ? W : H;
  const { x } = useSpring({ from: { x: length / 2 }, x: length / 2 - offset });

  const animateTo = useCallback(
    (e: HTMLElement) =>
      e && setOffset(mobile ? e.offsetLeft + e.offsetWidth / 2 : e.offsetTop + e.offsetHeight / 2),
    [mobile]
  );

  const handleClick = (slug: string) => (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    animateTo(event.currentTarget);
    onChange(slug);
  };

  useEffect(() => void animateTo(refAll.current), [animateTo]);

  return (
    <BrandSelectorWrapper>
      <animated.div
        style={{
          transform: x.to((x) => `translate3d(${mobile ? `0, 0` : `0, ${x}px`}, 0)`),
        }}
      >
        <BrandButton forwardRef={refAll} onClick={handleClick('')} active={brand === ''}>
          <img src="/icons/space.svg" alt="All" width="24" height="24" />
        </BrandButton>
        {data.map((b: Brand, i: number) => (
          <BrandButton key={i} onClick={handleClick(b.brandSlug)} active={brand === b.brandSlug}>
            {b.brandName}
          </BrandButton>
        ))}
      </animated.div>
    </BrandSelectorWrapper>
  );
};

export default BrandSelector;
