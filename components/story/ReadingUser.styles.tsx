import styled from 'styled-components';
import { a } from 'react-spring';

export const Avatar = styled(({ ...rest }) => <a.div {...rest} />)`
  position: absolute;
  opacity: 0.7;
  z-index: 3;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;

  img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  span {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    font-size: 14px;
    color: #fff;
    text-align: center;
    text-transform: uppercase;
    user-select: none;
  }
`;

// eslint-disable-next-line
export const ReadingUsersContainer = styled(({ active, forwardRef, ...rest }) => (
  <div ref={forwardRef} {...rest} />
))`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  pointer-events: none;
  visibility: ${(props) => (props.active ? 'visible' : 'hidden')};
  transition: visibility 700ms ease;
  overflow: hidden;
  z-index: 3;
`;
