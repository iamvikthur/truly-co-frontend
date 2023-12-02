import React from 'react';
import styled from 'styled-components';
import { ui } from '../../lib/utils';

/**
 * Button PlayPause
 */
export const ButtonPlayPause = styled(({ paused, ...rest }) => (
  <button {...rest}>
    {paused ? (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.15905 2.24643L19.6909 10.4469C20.817 11.2476 20.8111 12.9219 19.6795 13.7147L8.14764 21.7946C6.82217 22.7233 5 21.7751 5 20.1566V3.87634C5 2.25152 6.83489 1.30481 8.15905 2.24643Z"
          fill="white"
        />
      </svg>
    ) : (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 20V4C3 2.89543 3.89543 2 5 2H8C9.10457 2 10 2.89543 10 4V20C10 21.1046 9.10457 22 8 22H5C3.89543 22 3 21.1046 3 20Z"
          fill="white"
        />
        <path
          d="M14 20V4C14 2.89543 14.8954 2 16 2H19C20.1046 2 21 2.89543 21 4V20C21 21.1046 20.1046 22 19 22H16C14.8954 22 14 21.1046 14 20Z"
          fill="white"
        />
      </svg>
    )}
  </button>
))`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 24px;
  margin-right: 10px;
  z-index: 1;
  cursor: pointer;
`;

// eslint-disable-next-line
export const Controls = styled(({ visible, ...rest }) => <div {...rest} />)`
  position: absolute;
  right: 20px;
  bottom: 3px;
  left: 20px;
  display: flex;
  height: 75px;
  margin-top: auto;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 300ms ease;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    right: -20px;
    bottom: 0;
    left: -20px;
    height: 90px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%);
    pointer-events: none;
  }
`;

// eslint-disable-next-line
export const ProgressBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1 0 auto;

  input[type='range'],
  progress {
    position: absolute;
    flex: 1 0 auto;
    -webkit-appearance: none;
  }

  input[type='range'] {
    width: calc(100% + 17px - 40px - ${() => ui.scrollbarWidth || 0}px);
    left: -8.5px;
    height: 100%;
    -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
    background: none;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  input[type='range']:focus {
    outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
  }

  input[type='range']::-ms-track {
    width: 100%;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 17px;
    height: 17px;
    background: #fff;
    border-radius: 50%;
    margin-top: 28.5px;
    outline: 0;
    border: 0;
  }

  input[type='range']::-moz-range-thumb {
    border: 0;
  }

  input[type='range']::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    width: 100%;
    height: 100%;
    cursor: pointer;
    background: none;
  }

  progress {
    -webkit-appearance: none;
    appearance: none;
    width: calc(100% - 40px - ${() => ui.scrollbarWidth}px);
    height: 2px;
  }

  progress[value]::-webkit-progress-bar {
    height: 2px;
    background-color: rgba(255, 255, 255, 0.5);
  }

  progress[value]::-webkit-progress-value {
    height: 2px;
    background-color: #fff;
  }
`;

export const Time = styled.div`
  position: absolute;
  bottom: 65px;
  left: 34px;
  display: flex;
  color: #fff;
  font-weight: 300;
  font-size: 14px;
  line-height: 19px;
  pointer-events: none;
`;
