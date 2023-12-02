import { forwardRef } from 'react';
import styled from 'styled-components';
/* eslint-disable @typescript-eslint/no-unused-vars */

export const LottieContainer = styled(({ forwardRef, ...rest }) => (
  <div ref={forwardRef} {...rest} />
))`
  position: absolute;
  top: 0;
  right: 0;
  width: 32px;
  height: 32px;
`;

export const LottiePlaceholder = styled((props) => (
  <LottieContainer {...props}>
    <svg
      width="268"
      height="268"
      viewBox="0 0 268 268"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M134 249C197.513 249 249 197.513 249 134C249 70.4872 197.513 19 134 19C70.4872 19 19 70.4872 19 134C19 197.513 70.4872 249 134 249ZM134 262C204.692 262 262 204.692 262 134C262 63.3075 204.692 6 134 6C63.3075 6 6 63.3075 6 134C6 204.692 63.3075 262 134 262Z"
        fill="black"
      />
    </svg>
  </LottieContainer>
))``;

export const Logotype = styled(
  forwardRef(({ color, visible, ...rest }: any, ref) => <a ref={ref} {...rest} />)
)`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translate3d(-50%, ${({ visible }) => (visible ? 0 : -62)}px, 0);
  transition: transform 400ms ease;
  z-index: 5;

  svg {
    height: 32px !important;
    width: auto !important;
  }

  & > svg path,
  & > ${LottiePlaceholder as any} svg path {
    fill: ${({ color }) => color};
  }
  & > ${LottieContainer as any} svg path {
    stroke: ${({ color }) => color};
  }

  @media (min-width: 768px) {
    top: 30px;
    left: 50px;
    transform: translate3d(0, 0, 0);
    transition: none;

    & > svg path,
    & > ${LottiePlaceholder as any} svg path {
      fill: #fff;
    }
    & > ${LottieContainer as any} svg path {
      stroke: #fff;
    }
  }
`;
