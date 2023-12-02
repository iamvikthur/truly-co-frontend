import styled from 'styled-components';
import { ui } from '../../lib/utils';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

/** Chapters container */
// eslint-disable-next-line
export const ChaptersContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  height: calc(${() => ui.scrollbarWidth}px + 100%);
  overflow-y: hidden;
  scroll-snap-type: x mandatory;

  @media (min-width: 768px) {
    overflow-x: ${() => (ui.hasTouch ? 'auto' : 'hidden')};
    scroll-snap-type: ${() => (ui.hasTouch ? 'x mandatory' : 'none')};
    height: 100%;
  }
`;
