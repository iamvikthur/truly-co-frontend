import React from 'react';
import styled from 'styled-components';

// eslint-disable-next-line
export const Label = styled(({ filled, ...rest }) => <label {...rest} />)`
  position: relative;
  display: flex;
  height: 50px;
  font-family: 'Open Sans Condensed', sans-serif;
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;

  p + &,
  & + label {
    margin-top: 20px;
  }

  input {
    width: 100%;
    flex: 0 0 auto;
    line-height: 1;
    border-bottom: 1px solid #000;
  }

  & > input:focus + span {
    transform: scale(0.625) translateY(-26px);
  }

  & > input:focus::placeholder,
  & > input::placeholder {
    opacity: 0;
    visibility: hidden;
    color: transparent;
  }

  & > span {
    position: absolute;
    bottom: 13px;
    left: 0;
    display: inline-block;
    color: rgba(0, 0, 0, 0.5);
    transform: ${(props) => (props.filled ? 'scale(0.625) translateY(-26px)' : 'none')};
    transition: transform 300ms ease;
    transform-origin: top left;
  }
`;
