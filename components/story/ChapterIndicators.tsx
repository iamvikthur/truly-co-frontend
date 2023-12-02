import { useEffect, useRef, useState } from 'react';
import useMobile from '../../lib/useMobile';
import useResize from '../../lib/useResize';
import usePrevious from '../../lib/usePrevious';
import { Indicators, PatternContainer, PatternWrapper } from './ChapterIndicators.styles';
import Pattern from './Patterns/Pattern';

interface ChapterIndicatorsProps {
  activeIndex: number;
  brand: string;
  color?: string;
  count: number;
}

/** max width of svg */
const maxSvgWidth = 984;

const ChapterIndicators = ({ activeIndex, brand, color, count }: ChapterIndicatorsProps) => {
  const [indicatorMask, setIndicatorMask] = useState('');
  const [maskImage, setMaskImage] = useState('');
  const [polygon, setPolygon] = useState('');
  const container = useRef<HTMLDivElement>(null);
  const pattern = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  const prevIsMobile = usePrevious(isMobile);
  const [W, H] = useResize();

  /** Set polygon and maskImage */
  useEffect(() => {
    if (!container.current || !pattern.current) return;
    /** Container width */
    const containerWidth = container.current?.clientWidth;
    /** Count of fragment mask for indicators */
    const maxVisibleCount = count > 10 ? (isMobile ? 10 : 12) : count;
    /** Margin between indicators */
    const mb = 4;
    /** Side margin of indicators - mobile|desktop */
    const ms = isMobile ? 10 : 0;
    /** Indicator fragment mask width */
    const iw = (containerWidth - ms * 2 - mb * (maxVisibleCount - 1)) / maxVisibleCount;
    /** Indicator fragment width */
    const fr = iw + mb;
    /** Count of polygons of the fragment mask */
    const pc = isMobile && count > 10 ? maxVisibleCount + 1 : maxVisibleCount;

    /** Sets polygon */
    let polygon = '';
    Array.from({ length: pc }).forEach((_d: undefined, key: number) => {
      const start = fr * key + ms;
      const end = start + iw;
      const string = `${start}px 0, ${start}px 8px, ${end}px 8px, ${end}px 0px`;
      polygon = polygon.concat(string, ',');
    });
    const pre = isMobile && count > 10 ? `0px 0,0px 8px, ${ms - mb}px 8px,${ms - mb}px 0px,` : ``;
    setPolygon(`${pre} ${polygon.substring(0, polygon.length - 1)}`);

    /** Sets maskImage linear-gradient */
    const start = Math.min(activeIndex, 9) * fr + (isMobile ? ms : count > 10 ? fr : 0);
    const end = start + iw;
    const maskImage = `linear-gradient(to right,rgba(255, 255, 255, 0.3) ${start}px,black ${start}px,black ${end}px,rgba(255, 255, 255, 0.3) ${end}px)`;
    setMaskImage(maskImage);

    /** Gradient for indicators - only desktop */
    if (!isMobile) {
      const indicatorMask = `linear-gradient(
        to right, rgba(255, 255, 255, 0.1) ${0}px,#000 ${fr}px,
        #000 ${fr * 10}px,#000 ${fr * 11}px,
        rgba(255, 255, 255, 0.1) ${fr * 12}px)`;
      setIndicatorMask(indicatorMask);
    }

    /** Create array from children of pattern */
    const svgArr = Array.from(pattern.current?.children);
    /** Object from array */
    const svgEl = svgArr.reduce((_: any, key: Element) => key, {});
    /** Checking that the element is an SVGElement. */
    const isSvg = svgEl instanceof SVGElement;

    /** Shift pattern if the number of chapters is more than 10 */
    if (count > 10) {
      /** x - shift pattern */
      const x = fr * Math.min(9 - activeIndex, 0) + ms; // ms for mobile === 10, for desktop === 0
      /** pattern width */
      const patternWidth = fr * count - mb;

      pattern.current.style.width = `${patternWidth}px`;
      pattern.current.style.transform = `translateX(${x}px)`;

      /**
       * If isSvg === false - in this case "left" does not need to be applied
       * If pattern width is greater than svg max width set left for svg.
       */
      if (patternWidth > maxSvgWidth && isSvg) {
        /** left - for svg style */
        const left = (activeIndex - 11) * fr;
        /** If the active index is less than 11, then there is no left shift */
        if (activeIndex >= 11) {
          svgEl.style.left = `${left}px`;
        } else {
          svgEl.style.left = ``;
        }
      } else if (!isMobile) {
        svgEl.style.left = ``;
      }
    }

    /** Turn off transition if there is a state isMobile change */
    if (isMobile !== prevIsMobile && pattern.current) {
      pattern.current.style.transition = 'none';
      setTimeout(() => (pattern.current.style.transition = ''), 110);
    }
  }, [activeIndex, count, isMobile, prevIsMobile, W, H]);

  return (
    <Indicators
      extendedWidth={count > 10}
      indicatorMask={!isMobile && count > 10 ? indicatorMask : ''}
    >
      <PatternContainer ref={container}>
        <PatternWrapper
          brand={brand}
          maskImage={maskImage}
          polygon={polygon}
          color={color || '#000'}
        >
          <div ref={pattern}>
            <Pattern brand={brand} color={color} />
          </div>
        </PatternWrapper>
      </PatternContainer>
    </Indicators>
  );
};

export default ChapterIndicators;
