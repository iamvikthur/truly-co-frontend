import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Canvas } from 'react-three-fiber';
import { useSpring } from 'react-spring';
import Crossroad from './Crossroad';
import { ScrollArea, DotsContainer, Dot, Slider } from './CrossroadChapter.styles';

const CrossroadChapter = ({ items }) => {
  const router = useRouter();
  const refChange = useRef<(value: any) => void>(() => undefined);
  const dpr = typeof window === 'undefined' ? 2 : Math.max(2, window.devicePixelRatio);
  const scroll = useRef<HTMLDivElement>(null);
  const prevY = useRef(-1);

  const [{ v }, setV] = useSpring(() => ({ v: 0 }));
  const [{ y }, set] = useSpring(() => ({
    from: { y: 0.25 },
    y: 0.75,
    loop: { reverse: true },
    config: { mass: 1, tension: 280, friction: 120 },
    onProps: (_props, spring) => {
      if (spring.animation.fromValues.includes(spring.animation.to)) {
        setV({ v: 0.1, config: { tension: 500 } }).then(() =>
          v.start(0, { config: { tension: 170 } })
        );
      }
    },
    onChange: (value) => refChange.current(value),
  }));

  const handleScroll = useCallback(
    ({ target: t }) => {
      // ignore initial scroll
      if (prevY.current === -1) {
        prevY.current = 0;
        return;
      }
      // update animation
      const y = t.scrollTop / (t.scrollHeight - t.clientHeight);
      set({ y, config: { friction: 60 } });
      v.start(0, { from: Math.abs(prevY.current - y), config: { tension: 170 } });
      prevY.current = y;
    },
    [set, v]
  );

  const handleMouseMove = useCallback(
    (e) => {
      const clientY = e.clientY - e.currentTarget.getBoundingClientRect().top;
      set({ y: Math.round(clientY / e.currentTarget.clientHeight), config: { friction: 60 } });
    },
    [set]
  );

  const handleClick = useCallback(
    () => router.push(`/[[...story]]`, `/${items[Math.round(y.get())].storySlug}`),
    [items, router, y]
  );

  useEffect(() => {
    // set scroll position to the center
    scroll.current.scrollTop = (scroll.current.scrollHeight - scroll.current.clientHeight) / 2;
  }, []);

  return (
    <>
      <Canvas gl={{ alpha: false }} pixelRatio={dpr} invalidateFrameloop>
        <Crossroad items={items} refChange={refChange} />
      </Canvas>
      <DotsContainer>
        <Dot style={{ scale: y.to((y) => 1 + (1 - y)) }} />
        <Dot style={{ scale: y.to((y) => 1 + y) }} />
        <Slider style={{ y: y.to((y) => y * 80), height: v.to((v) => 32 + v * 50) }} />
      </DotsContainer>
      <ScrollArea
        forwardRef={scroll}
        onScroll={handleScroll}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      />
    </>
  );
};

export default CrossroadChapter;
