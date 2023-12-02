import styled from 'styled-components';

export const Panel = styled.div<any>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  padding: 0 10px 20px;
  background: #fff;
  color: #000;
  overflow-x: hidden;
  overflow-y: auto;
  transform: translateX(${(props) => (props.opened ? '0' : '100%')});
  transition: transform 200ms ease;
  z-index: 4;

  & button {
    cursor: pointer;
  }

  /** BUTTON CLOSE */
  & > button {
    top: 12px;

    @media (min-width: 768px) {
      display: none;
    }
  }

  @media (min-width: 768px) {
    width: 438px;
    padding: 0 41px 41px;
  }

  & > h2 {
    margin: 76px 0 50px;
    padding: 0 16px;
    font-weight: 600;
    font-size: 34px;
    line-height: 41px;
  }

  & h3 {
    font-family: 'Open Sans Condensed', sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 34px;
    line-height: 46px;
  }

  & h3 + form {
    margin-top: 40px;
  }
`;

/** Button Close */
export const ButtonClose = styled(({ children, ...rest }) => (
  <button {...rest}>
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.68555 24.3125L24.313 1.68508" stroke="black" strokeWidth="2" />
      <path d="M1.68555 1.6875L24.313 24.3149" stroke="black" strokeWidth="2" />
    </svg>
    {children}
  </button>
))`
  position: absolute;
  right: 14.69px;
  cursor: pointer;
  z-index: 3;

  & > a {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
  }
`;

/** Button Edit */
export const ButtonBack = styled(({ ...rest }) => (
  <button {...rest}>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 16.6836L22 4.68359" stroke="black" strokeWidth="2" />
      <path d="M10 15.3164L22 27.3164" stroke="black" strokeWidth="2" />
    </svg>
  </button>
))`
  cursor: pointer;
`;

/**
 * ERROR MESSAGE
 */
export const ErrorMessage = styled.p`
  display: block;
  margin-top: 30px;
  padding: 10px;
  background-color: #efefef;
  border-radius: 4px;
  color: #000;
  font-family: 'Open Sans Condensed', sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 18px;

  & + & {
    margin-top: 10px;
  }

  b {
    font-weight: 600;
  }
`;
