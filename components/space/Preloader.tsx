import styled from 'styled-components';

export const Preloader = styled((props) => (
  <div {...props}>
    <div>
      <div />
      <div />
      <div />
    </div>
    <div>
      <div />
      <div />
      <div />
    </div>
    <div>
      <div />
      <div />
      <div />
    </div>
  </div>
))`
  position: fixed;
  top: 50%;
  transform-origin: center;
  animation: anirotate 10s linear infinite;
  opacity: 0.1;
  &,
  & > div {
    width: 100px;
    height: 100px;
  }
  & > div {
    position: absolute;
    border: 0px solid #fff;
    border-radius: 50px;
    &:nth-child(2) {
      transform: rotate(40deg);
      & > div {
        animation-delay: -0.5s !important;
      }
    }
    &:nth-child(3) {
      transform: rotate(80deg);
      & > div {
        animation-delay: -1s !important;
      }
    }
  }
  & > div > div {
    position: absolute;
    height: 10px;
    width: 10px;
    background: #fff;
    border-radius: 5px;
    transform: translate(0, 0);
    &:nth-child(1) {
      top: 0;
      left: calc(50% - 5px);
      animation: ani1 2s infinite;
    }
    &:nth-child(2) {
      bottom: calc(28% - 5px);
      left: calc(11% - 5px);
      animation: ani2 2s infinite;
    }
    &:nth-child(3) {
      bottom: calc(28% - 5px);
      right: calc(11% - 5px);
      animation: ani3 2s infinite;
    }
  }

  @keyframes anirotate {
    0% {
      transform: translateY(-50%) rotate(0deg);
    }
    100% {
      transform: translateY(-50%) rotate(-359deg);
    }
  }

  @keyframes ani1 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-40px, 67px);
    }
  }

  @keyframes ani2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(77px, 0);
    }
  }

  @keyframes ani3 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-39px, -67px);
    }
  }
`;
