import styled from 'styled-components';
import { ui } from '../../lib/utils';
import { StyledHeader } from '../profile/Header.styles';

export const braintreeStyles = {
  input: {
    'font-size': '16px',
    'font-family': "'Open Sans Condensed', sans-serif",
    'font-weight': '300',
    color: 'rgba(0,0,0,0.55)',
    border: 0,
  },
  ':focus': {
    color: 'rgba(0,0,0,1)',
  },
  '.valid': {
    color: '#0B6E5F',
  },
};

// eslint-disable-next-line
export const CrowdfundingSupportContainer = styled(({ opened, ...rest }) => <div {...rest} />)`
  position: absolute;
  top: 98px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 37px 10px 0;
  background-color: #fff;
  transform: translateX(${(props) => (props.opened ? 0 : '100%')});
  transition: transform 300ms ease;
  overflow-y: auto;
  z-index: 6;

  & > ${StyledHeader} {
    display: none;
  }

  @media (min-width: 768px) {
    top: 0;
    padding-top: 0;

    & > ${StyledHeader} {
      top: 0;
      display: block;
      width: 100%;
      height: 52px;
      margin-left: 0;
    }
  }

  h3 {
    margin-bottom: 27px;
    font-family: 'Open Sans Condensed', sans-serif;
    font-weight: 300;
    font-size: 34px;
    line-height: 1.2;
  }
`;

export const CrowdfundingSupportSection = styled.section`
  width: 100%;
  height: calc(100% + 179px);

  @media (min-width: 768px) {
    height: 100%;
    padding-top: 40px;
  }
`;

export const CrowdfundingDonationStatus = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 37px 10px 0;
  background-color: #fff;
  z-index: 6;

  @media (min-width: 768px) {
    padding: 99px 10px 0;
  }

  p {
    font-family: 'Open Sans Condensed', sans-serif;
    font-weight: 300;
    font-size: 34px;
    line-height: 1.2;
    color: #000;

    b {
      font-weight: 700;
    }
  }

  button {
    position: absolute;
    right: ${() => ui.scrollbarWidth}px;
    bottom: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% - 20px - ${() => ui.scrollbarWidth}px);
    height: 44px;
    margin: 0 10px;
    transition: width 300ms ease;
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
    font-size: 14px;
    line-height: 19px;
    color: #fff;
    text-align: center;
    background-color: #000;
    border-radius: 90px;
    z-index: 5;
    cursor: pointer;
  }
`;
