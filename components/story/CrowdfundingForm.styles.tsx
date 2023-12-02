import styled from 'styled-components';

export const Form = styled.form`
  & > label {
    margin-top: 14px;
  }

  & > fieldset {
    display: flex;
    flex-wrap: wrap;
    margin-top: 21px;
    padding: 21px 10px 0;
    border: 1px solid #000;
    border-radius: 10px;

    & > label {
      flex: 0 0 auto;
      height: 50px;
      margin-bottom: 21px;
    }

    & > label:nth-child(2),
    & > label:nth-child(3) {
      width: calc(50% - 10px);
    }

    & > label:nth-child(3) {
      margin-left: 20px;
    }
  }

  .hosted-field {
    display: inline-block;
    width: 100%;
    height: 30px;
    font-weight: 300;
    font-size: 16px;
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid #000;
    line-height: 22px;
  }

  & input,
  & label {
    width: 100%;
  }

  .button-container {
    margin-top: 20px;
    margin-bottom: 20px;

    & > input {
      width: 100%;
      margin-top: 0;
    }
  }
`;

// eslint-disable-next-line
export const FieldWithCurrensyList = styled(({ minMaxCurrencyPrevent, ...rest }) => (
  <div {...rest} />
))`
  position: relative;

  & > span {
    position: absolute;
    top: 2px;
    left: 0;
    width: 1em;
    color: ${(props) => (props.minMaxCurrencyPrevent ? `rgba(222,222,222,0.5)` : '#000')};
    pointer-events: none;
    z-index: 1;
  }

  & > p {
    margin-top: 3px;
    padding-left: 0;
    background-color: unset;
  }

  & > span,
  & > label > input {
    font-family: 'Open Sans Condensed', sans-serif;
    font-weight: 700;
    font-size: 34px;
    line-height: 46px;
  }

  & > label > input {
    left: -0.5em;
    padding-left: 0.5em;
    color: ${(props) => (props.minMaxCurrencyPrevent ? `rgba(222,222,222,0.5)` : '')};
  }
`;

// eslint-disable-next-line
export const CurrencyList = styled(({ opened, ...rest }) => <div {...rest} />)`
  position: absolute;
  right: 0;
  left: 0;

  & > span {
    position: absolute;
    right: 0;
    bottom: 12px;
    cursor: pointer;
  }

  & span {
    width: 50px;
    height: 30px;
    margin-left: 17px;
    border-radius: 41px;
    text-align: center;
    vertical-align: middle;
    line-height: 30px;
    border: 1px solid #000;
  }

  ul {
    visibility: ${(props) => (props.opened ? 'visible' : 'hidden')};
    position: absolute;
    right: 0;
    top: calc(100% + 11px);
    display: inline-block;
    padding: 12px 5px 12px 12px;
    background-color: #fff;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    list-style: none;
    z-index: 1;
  }

  li + li {
    margin-top: 17px;
  }

  li label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    cursor: pointer;
  }

  input {
    display: none;
  }

  li label > p,
  li label > span {
    flex: 0 0 auto;
    display: inline-block;
    font-family: 'Open Sans Condensed', sans-serif;
    font-weight: 300;
    font-size: 16px;
  }

  li label > p {
    line-height: 1.2;
    font-style: italic;
  }

  li label > span {
    border-color: transparent;
  }

  input:checked ~ span {
    border-color: #000;
  }
`;
