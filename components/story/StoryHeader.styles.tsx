import React from 'react';
import styled from 'styled-components';
import { ButtonClose } from '../profile/ProfilePanel.styles';
import { ui } from '../../lib/utils';

/**
 * STORY HEADER
 * */
// eslint-disable-next-line
export const Header = styled(({ blackTheme, hidden, textColor, ...rest }: any) => (
  <div {...rest} />
))`
  position: absolute;
  top: 70px;
  right: calc(${() => ui.scrollbarWidth + 10}px);
  left: 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px 18px 12px 16px;
  border-radius: 4px;
  color: ${(props) =>
    props.blackTheme ? '#000' : props.textColor ? `${props.textColor}` : '#fff'};
  background-color: ${(props) => (props.blackTheme ? '#fafafa' : 'rgba(250, 250, 250, 0.2)')};
  transform: translateY(${(props) => (props.hidden ? -20 : 0)}px);
  opacity: ${(props) => (props.hidden ? 0 : 1)};
  visibility: ${(props) => (props.hidden ? 'hidden' : 'visible')};
  transition: transform 300ms ease, opacity 300ms ease, visibility 300ms ease;
  transition-delay: 0ms, ${(props) => (props.hidden ? 0 : 300)}ms,
    ${(props) => (props.hidden ? 0 : 300)}ms;
  z-index: 2;

  @media (min-width: 768px) {
    top: 9px;
  }

  /** Styles for authorName, publishedAt, storyName */
  & > h6,
  & > p {
    flex: 0 0 auto;
    display: inline-block;
    font-size: 14px;
    line-height: 1;
    color: inherit;
  }

  & > h6 {
    width: 100%;
    margin: 0;
    padding-bottom: 7px;
    font-weight: 700;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-x: hidden;
  }

  & > p {
    font-style: italic;
    font-weight: 300;
    white-space: pre;
  }

  & + ${ButtonClose} {
    display: none;

    @media (min-width: 768px) {
      display: block;
      right: -25px;
    }
  }
`;
