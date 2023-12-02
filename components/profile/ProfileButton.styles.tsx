import styled from 'styled-components';
/* eslint-disable @typescript-eslint/no-unused-vars */

export const Button = styled(({ visible, color, ...rest }) => <button {...rest} />)`
  position: fixed;
  top: 10px;
  right: 15px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: 0;
  outline: 0;
  line-height: 35px;
  color: #fff;
  transform: translate3d(0, ${({ visible }) => (visible ? 0 : -62)}px, 0);
  transition: transform 400ms ease;
  cursor: pointer;
  z-index: 3;
  -webkit-appearance: none;

  & > span {
    padding: 3px 19px;
    font-size: 18px;
    line-height: 25px;
    color: ${({ color }) => color || '#000'};
    transition: color 400ms linear;
    border: 1px solid ${({ color }) => color || '#000'};
    border-radius: 90px;
  }

  @media (min-width: 768px) {
    top: 30px;
    right: 50px;
    transform: translateY(0px);

    & > span {
      color: #fff;
      border: 1px solid #fff;
    }
  }
`;
