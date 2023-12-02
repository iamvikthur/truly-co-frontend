import React from 'react';
import styled from 'styled-components';
import { Logotype } from '../Logo.styles';
import { Button } from '../profile/ProfileButton.styles';
import { ButtonBack } from '../profile/ProfilePanel.styles';

export const Header = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 62px;
  z-index: 4;

  @media (min-width: 768px) {
    top: -41px;
    height: 8px;
  }

  & ${Logotype} {
    top: auto;
    display: block;

    @media (min-width: 768px) {
      display: none;
    }
  }

  & ${Button} {
    display: block;

    @media (min-width: 768px) {
      display: none;
    }
  }
`;

// eslint-disable-next-line
export const HeaderElements = styled(({ active, collapsed, forwardRef, secondary, ...rest }) => (
  <div ref={forwardRef} {...rest} />
))`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 9px;
  background-color: ${(props) => (props.secondary ? '#fff' : 'unset')};
  transform: translateY(${(props) => (props.active ? (props.collapsed ? -47 : 0) : -62)}px);
  transition: transform 400ms ease;
  ${(props) => props.secondary && `transition-delay: 100ms;`}

  ${Button} {
    transform: translate3d(0, 0, 0);
    transition: transform 400ms ease;
    ${(props) => props.secondary && `color: #000;`}
  }

  @media (min-width: 768px) {
    background-color: unset;
    display: ${(props) => (props.secondary ? '' : 'none')};
    padding: 0;
    transform: translateY(0px);

    & > a {
      display: none;
    }
  }

  & > a:first-child {
    position: absolute;
    top: auto;
    bottom: auto;
    left: 9px;
  }

  & > a {
    z-index: 3;
  }

  & > ${ButtonBack} {
    position: absolute;
    left: 0;
  }
`;

export const IconCloud = styled(({ color, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    {...rest}
  >
    <g stroke={color || '#000'} strokeLinejoin="round" strokeWidth=".5" opacity=".3">
      <path d="M21 9L3.5 18.5 2 8.5 21 9z" />
      <path d="M11.5 22l8.5-5.5L9.5 4l2 18z" />
    </g>
    <path
      fill={color || '#000'}
      d="M0 18.25c0-2.07 1.68-3.75 3.75-3.75 2.07 0 3.75 1.68 3.75 3.75C7.5 20.32 5.82 22 3.75 22 1.68 22 0 20.32 0 18.25zM.125 9a2.001 2.001 0 014 0 2.001 2.001 0 01-4 0zM9.375 22a2.001 2.001 0 014 0 2.001 2.001 0 01-4 0zM18.625 9a2.001 2.001 0 014 0 2.001 2.001 0 01-4 0zM19.583 12.5c-2.048 0-3.708 3.708-3.708 3.708s1.66 3.709 3.708 3.709c2.049 0 3.709-3.709 3.709-3.709s-1.66-3.708-3.709-3.708zM9.468 6.772l1.214.721.563-1.297 1.408-.132-.305-1.38 1.061-.937-1.061-.937.305-1.38-1.409-.133L10.683 0 9.468.722 8.254 0l-.562 1.297-1.408.132.305 1.38-1.061.938 1.061.936-.305 1.38 1.408.133.562 1.297 1.214-.721z"
    />
  </svg>
))``;

export const CrowdfundingProgress = styled.div`
  position: absolute;
  bottom: -36px;
  left: 10px;
  width: calc(100% - 20px);
  background-color: #fff;
  padding-bottom: 10px;

  @media (min-width: 768px) {
    bottom: -31px;
    left: 0;
    width: 100%;
    background-color: transparent;
  }

  &::before {
    content: '';
    position: absolute;
    right: -10px;
    bottom: 0;
    left: -10px;
    display: block;
    height: 1px;
    background-color: rgba(196, 196, 196, 0.2);

    @media (min-width: 768px) {
      & {
        display: none;
      }
    }
  }

  progress {
    width: 100%;
    height: 4px;
    appearance: none;
    border: none;
    padding: 0;

    &[value]::-webkit-progress-bar {
      background-color: #c4c4c4;
      border-radius: 50px;
      padding: 0;
    }

    &[value]::-webkit-progress-value {
      background-color: #000;
      border-radius: 50px 0 0 50px;
      padding: 0;

      @media (min-width: 768px) {
        background-color: #fff;
      }
    }
  }

  p {
    display: flex;
    margin-top: 10px;
    padding-right: 38px;
    font-size: 16px;
    line-height: 1;
    font-family: 'Open Sans Condensed', sans-serif;
    font-weight: 300;
    white-space: pre-wrap;

    @media (min-width: 768px) {
      color: #fff;
      margin-top: 5px;
    }

    & > b {
      font-weight: 700;
    }

    & > b:last-child {
      margin-left: auto;
    }
  }
`;
