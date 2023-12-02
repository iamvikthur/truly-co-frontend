import React from 'react';
import styled from 'styled-components';
import { AvatarContainer } from '../Avatar';

// eslint-disable-next-line
export const Discussion = styled(({ active, ...rest }) => <div {...rest} />)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  transform: translateY(${(props) => (props.active ? 0 : 100)}%);
  transition: transform 300ms ease;
  background-color: #fff;
  z-index: 5;

  @media (min-width: 768px) {
    width: 414px;
    height: 736px;
    transform: translateY(${(props) => (props.active ? 0 : 736)}px);
  }

  @media (max-height: 789.8px) and (min-width: 768px) {
    width: 375px;
    height: 88vh;
    max-height: 736px;
  }

  & > textarea {
    position: absolute;
    right: 10px;
    bottom: 15px;
    left: 10px;
    flex: 0 0 auto;
    display: block;
    width: calc(100% - 20px);
    padding: 14px 10px 0 29px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
    font-size: 14px;
    line-height: 1;
    background-color: #fff;
    border: 1px solid #e8e8e8;
    box-sizing: border-box;
    border-radius: 60px;
    resize: none;
    outline: 0;
    -webkit-appearance: none;
    z-index: 2;
  }

  & > p {
    position: absolute;
    right: 10px;
    bottom: 15px;
    left: 10px;
    flex: 0 0 auto;
  }
`;

// eslint-disable-next-line
export const Chat = styled(({ overflow, forwardRef, ...rest }) => (
  <div ref={forwardRef} {...rest} />
))`
  position: relative;
  flex: 1 0 auto;
  height: calc(100% - 54px);
  margin-top: 54px;
  padding: 20px 10px 88px;
  overflow-y: auto;

  & > p {
    margin-top: 59px;
    font-family: 'Open Sans Condensed', sans-serif;
    font-style: italic;
    font-weight: 300;
    font-size: 44px;
    line-height: 1;
  }

  @media (max-height: 789.8px) and (min-width: 768px) {
    // width: 375px;
    height: calc(88vh - 54px);
    // max-height: 736px;
  }
`;

export const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 54px;
  padding: 0 60px 0 10px;
  background-color: #fff;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    border-bottom: 1px solid #000;
    opacity: 0.1;
  }

  p {
    width: 100%;
    font-family: 'Open Sans Condensed', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 1.2;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  & + button {
    top: 13px;
    right: 10px;
  }
`;

// eslint-disable-next-line
export const Message = styled(({ isComplained, mine, ...rest }) => <div {...rest} />)`
  position: relative;
  display: flex;
  padding-bottom: 10px;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, ${(props) => (props.isComplained ? 0.2 : 0)});
    transition: background 300ms ease;
    z-index: 2;
    pointer-events: none;
  }

  & + div {
    margin-top: ${(props) => (props.mine ? 10 : 20)}px;
  }

  ${AvatarContainer} {
    align-self: flex-end;
    margin-right: 7px;
    z-index: 1;
  }

  & > p {
    position: relative;
    max-width: ${(props) => (props.mine ? '66.19718309859155%' : '74.92957746478874%')};
    padding: 11px 20px;
    font-family: 'Open Sans Condensed', sans-serif;
    font-weight: 300;
    font-size: 16px;
    line-height: 22px;
    color: ${(props) => (props.mine ? '#fff' : '#000')};
    word-break: break-word;
    white-space: pre-line;
    border: 2px solid #4d2d7f;
    background-color: ${(props) => (props.mine ? '#4d2d7f' : '#fff')};
    border-radius: ${(props) => (props.mine ? 30 : 0)}px;
    cursor: ${(props) => (props.mine ? 'default' : 'pointer')};
    z-index: ${(props) => (props.isComplained ? 3 : 1)};
  }

  & > span {
    display: block;
    align-self: center;
    order: ${(props) => (props.mine ? -1 : 0)};
    margin-right: ${(props) => (props.mine ? '9px' : '0')};
    margin-left: ${(props) => (props.mine ? 'auto' : '9px')};
    font-family: 'Open Sans Condensed', sans-serif;
    font-weight: 300;
    font-size: 12px;
    line-height: 16px;
    color: rgba(0, 0, 0, 0.5);
  }
`;

// eslint-disable-next-line
export const ButtonSend = styled(({ visible, ...rest }) => (
  <button {...rest}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 12.5L12 3L21.5 12.5" stroke="black" strokeWidth="2" />
      <path d="M12 4V22.5" stroke="black" strokeWidth="2" />
    </svg>
  </button>
))`
  position: absolute;
  bottom: 22px;
  right: 20px;
  background-color: #fff;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  pointer-events: ${(props) => (props.visible ? 'auto' : 'none')};
  transition: opacity 300ms ease, visibility 300ms ease;
  cursor: pointer;
  z-index: ${(props) => (props.visible ? 3 : 1)};
`;

// eslint-disable-next-line
export const ButtonComlain = styled(({ visible, ...rest }) => <button {...rest}>Report</button>)`
  position: absolute;
  bottom: -42px;
  left: 40px;
  width: 100%;
  max-width: 74.92957746478874%;
  padding: 10px 20px;
  transition: opacity 300ms ease;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  background-color: #fff;
  border-radius: 10px;
  text-align: left;
  font-family: 'Open Sans Condensed', sans-serif;
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  color: #000;
  cursor: pointer;
  pointer-events: ${(props) => (props.visible ? 'auto' : 'none')};
  z-index: 3;
`;
