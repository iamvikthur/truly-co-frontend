import React from 'react';
import styled from 'styled-components';

/** Chapter section */
// eslint-disable-next-line
export const Section = styled(({ forwardRef, isCrossroad, ...rest }) => (
  <section ref={forwardRef} {...rest} />
))`
  position: relative;
  flex: 1 0 auto;
  width: 100%;
  height: 100%;
  padding-bottom: ${({ isCrossroad }) => (isCrossroad ? 0 : 93)}px;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  z-index: 1;
  scroll-snap-align: center;
  scroll-snap-stop: always;

  @media (min-width: 768px) {
    padding-top: 0;
  }

  &::before {
    content: ${({ isCrossroad }) => (isCrossroad ? `''` : `none`)};
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 62px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
    pointer-events: none;
    z-index: 1;
  }
`;

export const CallToSwipe = styled(({ ...rest }) => (
  <div {...rest}>
    <svg
      width="155"
      height="24"
      viewBox="0 0 155 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.5 21.5L3 12L12.5 2.5" stroke="black" strokeWidth="2" />
      <path d="M4 12L153 12" stroke="black" strokeWidth="2" />
    </svg>
    <p>Swipe to next chapter</p>
  </div>
))`
  display: flex;
  align-items: center;
  margin-top: 32px;
  padding: 0 10px 0 26px;

  p {
    font-family: Inter, 'Open Sans Condensed', sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 28px;
    color: #000;
    margin-left: 19px;
  }

  svg {
    transform: scaleX(-1);
  }
`;
