import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ui } from '../../lib/utils';

const discussionAnimation = keyframes`
  0% {background-position: 0px top;}
  100% {background-position: calc(-1 * (24px * 60)) top;}
`;

const DiscussionSprite = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(/icons/discussion.png);
  background-position: top left;
  background-size: calc(24px * 60) 24px;
  animation: ${discussionAnimation} 1000ms steps(60) infinite;
`;

// eslint-disable-next-line
export const Button = styled(({ minimize, ...rest }) => <button {...rest} />)`
  position: absolute;
  right: ${() => ui.scrollbarWidth}px;
  bottom: 19px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${(props) => (props.minimize ? `44px` : `calc(100% - 20px - ${ui.scrollbarWidth}px)`)};
  height: 44px;
  margin: 0 10px;
  padding: 0 20px;
  transition: width 300ms ease;
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  font-size: 14px;
  line-height: 19px;
  color: rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 60px;
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.2));
  z-index: 2;
  cursor: pointer;
  overflow: hidden;
  // Fix bug in Safari
  transform: translateZ(0);

  & p {
    position: absolute;
    left: ${(props) => (props.minimize ? 'calc(-100vw + 80px)' : '29px')};
    opacity: ${(props) => (props.minimize ? 0 : 1)};
    transition: opacity 300ms ease;
    transition-delay: ${(props) => (props.minimize ? 0 : 300)}ms;
  }
`;

export const DiscussionIcon = styled(({ hasDiscussions, ...rest }) => (
  <div {...rest}>
    {hasDiscussions ? (
      <DiscussionSprite />
    ) : (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect y="11" width="24" height="2" fill="black" />
        <rect x="13" width="24" height="2" transform="rotate(90 13 0)" fill="black" />
      </svg>
    )}
  </div>
))`
  position: absolute;
  right: 10px;
  width: 24px;
  height: 24px;
`;
