import React from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { SatelliteContainer } from './SatelliteLink.styles';

export const Player = styled(({ forwardRef, ...rest }) => (
  <ReactPlayer ref={forwardRef} {...rest} />
))`
  position: absolute;
  top: 0;
  left: 0;
`;

// eslint-disable-next-line
export const VideoContainer = styled(({ paused, withSatellite, ...rest }) => <div {...rest} />)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    pointer-events: none;
    z-index: 1;
  }

  &::before {
    height: 62px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
  }

  &::after {
    bottom: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%);
    opacity: ${(props) => (props.paused ? 1 : 0)};
    transition: opacity 200ms ease;
  }

  & > h3 {
    margin: auto 20px ${(props) => (props.withSatellite ? 172 : 90)}px 54px;
    font-weight: 700;
    font-size: 40px;
    line-height: 54px;
    color: #fff;
    opacity: ${(props) => (props.paused ? 1 : 0)};
    transition: opacity 200ms ease;
    z-index: 2;
  }

  & + ${SatelliteContainer} {
    position: absolute;
    top: auto;
    bottom: 100px;
    left: 54px;
    margin: auto 0;
    opacity: ${(props) => (props.paused ? 1 : 0)};
    visibility: ${(props) => (props.paused ? 'visible' : 'hidden')};
    pointer-events: ${(props) => (props.paused ? 'auto' : 'none')};
    transition: opacity 200ms ease, visibility 200ms ease;
  }

  & video {
    object-fit: cover;
  }
`;

/**
 * Button Play
 */
// eslint-disable-next-line
export const ButtonPlay = styled(({ visible, ...rest }) => (
  <button {...rest}>
    <svg width="37" height="48" viewBox="0 0 37 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.15904 2.24643L33.6909 22.5358C34.817 23.3365 34.8111 25.0107 33.6795 25.8036L5.14764 45.7946C3.82217 46.7233 2 45.7751 2 44.1566V3.87634C2 2.25152 3.83489 1.30481 5.15904 2.24643Z"
        stroke="white"
        strokeWidth="3"
      />
    </svg>
  </button>
))`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  margin: auto;
  z-index: 2;

  & > svg {
    opacity: ${(props) => (props.visible ? 1 : 0)};
    transition: opacity 300ms ease;
  }
`;
