import styled from 'styled-components';
import { ui } from '../../lib/utils';

// eslint-disable-next-line
export const StyledTab = styled(({ selected, ...rest }) => <button {...rest} />)`
  position: relative;
  flex: 0 0 auto;
  text-align: center;
  cursor: pointer;

  & + & {
    margin-left: 20px;
  }

  & > h3 {
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Open Sans Condensed', sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 34px;
    line-height: 46px;
    opacity: ${(props) => (props.selected ? 1 : 0.5)};
    transition: opacity 300ms ease;
  }
`;

// eslint-disable-next-line
export const StyledTabs = styled(({ scrollbarWidth, ...rest }) => <div {...rest} />)`
  position: relative;
  display: flex;
  align-items: flex-end;
  margin-top: 72px;
  margin-right: ${() => ui.scrollbarWidth}px;
  margin-bottom: 40px;
  z-index: 2;

  @media (min-width: 768px) {
    margin-top: 62px;
  }
`;
