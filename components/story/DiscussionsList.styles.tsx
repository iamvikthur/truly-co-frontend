import styled from 'styled-components';
import { ui } from '../../lib/utils';

// eslint-disable-next-line
export const List = styled(({ active, forwardRef, ...rest }) => <ul ref={forwardRef} {...rest} />)`
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: calc(100% - 20px - ${() => ui.scrollbarWidth}px);
  padding: 20px 15px 21px 20px;
  list-style: none;
  transform: translateY(${(props) => (props.active ? 0 : 'calc(10px + 100%)')});
  transition: transform 300ms ease;
  background-color: #fff;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  z-index: 3;

  li + li {
    margin-top: 8px;
  }

  li h5 {
    margin: 0 0 12px;
    font-size: 16px;
    line-height: 1;
    font-weight: 700;
  }

  li a > p,
  li a > span {
    display: inline-block;
  }

  li a > span {
    min-width: 18px;
    min-height: 18px;
    background-color: #68a278;
    margin-right: 20px;
    border-radius: 70px;
    font-family: 'Open Sans Condensed', sans-serif;
    font-weight: 300;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    color: #fff;
  }

  li a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
`;
