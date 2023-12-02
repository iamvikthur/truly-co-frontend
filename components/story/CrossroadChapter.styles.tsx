import styled from 'styled-components';
import { ui } from '../../lib/utils';
import { a } from 'react-spring';

export const ScrollArea = styled(({ forwardRef, ...rest }) => (
  <div ref={forwardRef} {...rest}>
    <div />
  </div>
))`
  position: absolute;
  top: 0;
  right: ${() => -ui.scrollbarWidth}px;
  bottom: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  cursor: pointer;

  & > div {
    height: 200%;
  }
`;

export const DotsContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
`;

export const Dot = styled(a.div)`
  position: absolute;
  top: calc(50% - 41px);
  left: calc(50% - 1px);
  width: 2px;
  height: 2px;
  background: #fff;
  border-radius: 50%;
  transform-origin: center;

  & + & {
    top: calc(50% + 39px);
  }
`;

export const Slider = styled(a.div)`
  position: absolute;
  top: calc(50% - 40px - 16px);
  left: calc(50% - 16px);
  width: 32px;
  height: 32px;
  border: 1px solid #fff;
  border-radius: 32px;
`;
