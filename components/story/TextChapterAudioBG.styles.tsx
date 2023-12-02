import styled, { css, keyframes } from 'styled-components';
import { ui } from '../../lib/utils';

export const Audio = styled.audio`
  position: absolute;
  z-index: -100;
  pointer-events: none;
  visibility: hidden;
`;

const animationDuration = 1400;

const animationAudio = keyframes`
  from {
    transform: scaleY(1);
  }
  35% {
    transform: scaleY(0.25);
  }
  50% {
    transform: scaleY(0.375);
  }
  65% {
    transform: scaleY(0.125);
  }
  to {
    transform: scaleY(1);
  }
`;

const animationAmbientAudio = keyframes`
  from {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  to {
    opacity: 0;
  }
`;

/** Button Mute */
// eslint-disable-next-line
export const ButtonMute = styled(({ callToAction, muted, ...rest }) => (
  <button {...rest}>
    <div>
      {Array.from({ length: 7 }).map((_s: any, key: number) => (
        <span key={key} />
      ))}
    </div>
  </button>
))`
  position: absolute;
  right: calc(${() => ui.scrollbarWidth + 18}px);
  bottom: 83px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  z-index: 2;

  &::after {
    content: 'Ambient Audio';
    position: absolute;
    top: -6px;
    right: -6px;
    bottom: 0;
    display: flex;
    align-items: center;
    width: 177px;
    height: 44px;
    padding-left: 20px;

    font-family: 'Open Sans';
    font-weight: 300;
    font-size: 14px;
    line-height: 19px;
    color: #fff;
    opacity: ${(props) => (props.callToAction ? 1 : 0)};
    transition: opacity 300ms ease;

    background-color: rgba(0, 0, 0, 0.55);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    border-radius: 60px;
    z-index: 0;
    pointer-events: none;

    ${(props) =>
      props.callToAction &&
      css`
        animation-timing-function: ease;
        animation-duration: ${2400}ms;
        animation-iteration-count: infinite;
        animation-name: ${animationAmbientAudio};
      `}
  }

  &:hover::after {
    opacity: 1;
  }

  & > div {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 4px;
    border-radius: 50%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    transition: opacity 300ms ease;
    background-color: #fff;
    z-index: 2;
  }

  & > div > span {
    display: block;
    width: 2px;
    height: 16px;
    background-color: #000;
    animation-timing-function: ease;
    animation-duration: ${animationDuration}ms;
    animation-iteration-count: infinite;
    animation-play-state: ${(props) => (props.muted ? 'paused' : 'running')};

    & + span {
      margin-left: 1px;
    }

    &:nth-child(1),
    &:nth-child(7) {
      transform: scaleY(0.125);
    }

    &:nth-child(2) {
      transform: scaleY(0.25);
      animation-name: ${animationAudio};
      animation-delay: -${animationDuration * 0.25}ms;
    }

    &:nth-child(3) {
      transform: scaleY(0.625);
      animation-name: ${animationAudio};
      animation-delay: -${animationDuration * 0.625}ms;
    }

    &:nth-child(4) {
      transform: scaleY(1);
      animation-name: ${animationAudio};
    }

    &:nth-child(5) {
      transform: scaleY(0.25);
      animation-name: ${animationAudio};
      animation-delay: -${animationDuration * 0.25}ms;
      animation-direction: reverse;
    }

    &:nth-child(6) {
      transform: scaleY(0.375);
      animation-name: ${animationAudio};
      animation-delay: -${animationDuration * 0.375}ms;
    }
  }
`;
