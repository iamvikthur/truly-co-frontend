import Space from './Space';
import { SharedCanvasContext } from 'react-three-fiber';
import * as THREE from 'three';
import styled, { keyframes } from 'styled-components';

export type UseThree = SharedCanvasContext & { camera: THREE.PerspectiveCamera };

export const LIMIT = 20;
export const CAMERA_OFFSET = 3;
export const CAMERA_Z = LIMIT + CAMERA_OFFSET;
export const MAX_DISTANCE = CAMERA_Z + 2;
export const MIN_DISTANCE = CAMERA_OFFSET + 2;
export const FOV = 75;
export const vFOV = 2 * Math.tan((FOV * Math.PI) / 180 / 2) * CAMERA_OFFSET;

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export const Overlay = styled(({ visible, elevate, ...rest }) => <div {...rest} />)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  cursor: url(/icons/cross-white.svg) 16 16, pointer;
  z-index: ${({ visible, elevate }) => (visible ? (elevate ? 3 : 1) : -1)};
`;

export const SpaceMsg = styled.p`
  position: fixed;
  top: 50%;
  left: 50%;
  max-width: 75vw;
  text-align: center;
  transform: translate3d(-50%, -50%, 0);
  z-index: 1;
`;

const autoHide = keyframes`
0%, 90% {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}
100% {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
`;

export const Notification = styled.p`
  position: fixed;
  top: 25px;
  left: 12.5vh;
  right: 12.5vh;
  font-size: 30px;
  line-height: 39px;
  text-align: center;
  user-select: none;
  cursor: url(/icons/cross-white.svg) 16 16, pointer;
  animation: ${autoHide} 5s forwards;

  img {
    height: 30px;
    vertical-align: middle;
  }

  @media (max-width: 767.98px) {
    display: none;
  }
`;

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export const ZoomOut = styled(({ active, ...rest }) => (
  <div {...rest}>
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4L14 14" stroke="white" />
      <path d="M46 46L36 36" stroke="white" />
      <path d="M46 4L36 14" stroke="white" />
      <path d="M4 46L14 36" stroke="white" />
      <path d="M11.5 14.5H14.5V11.5" stroke="white" />
      <path d="M38.5 35.5L35.5 35.5L35.5 38.5" stroke="white" />
      <path d="M35.5 11.5L35.5 14.5L38.5 14.5" stroke="white" />
      <path d="M14.5 38.5L14.5 35.5L11.5 35.5" stroke="white" />
    </svg>
    <span>zoom out</span>
  </div>
))`
  position: fixed;
  top: 50%;
  left: 50%;
  color: #fff;
  transform: translate3d(-50%, -50%, 0);
  transition: opacity 200ms ease;
  opacity: ${({ active }) => (active ? 1 : 0)};
  pointer-events: ${({ active }) => (active ? 'auto' : 'none')};
  cursor: pointer;

  span {
    position: absolute;
    right: 0;
    left: 0;
    font-size: 11px;
    font-style: italic;
    line-height: 50px;
    text-align: center;
    text-transform: uppercase;
    user-select: none;
  }
`;

export default Space;
