import styled from 'styled-components';

export const SideMenuContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

  & > button {
    display: block;

    @media (min-width: 768px) {
      display: none;
    }
  }
`;

// eslint-disable-next-line
export const SideMenuList = styled(({ active, ...rest }) => <ul {...rest} />)`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  margin: 0;
  padding: 0;
  padding-top: 20px;
  list-style: none;
  pointer-events: ${(props) => (props.active ? 'auto' : 'none')};
  visibility: ${(props) => (props.active ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.active ? 1 : 0.3)};
  transition: visibility 400ms ease, opacity 400ms ease;
  transition-delay: ${(props) => (props.active ? 100 : 0)}ms;

  @media (min-width: 768px) {
    padding-top: 0;
  }

  & > li {
    position: relative;
    font-family: 'Open Sans Condensed', sans-serif;
    font-weight: 300;
    font-size: 34px;
    line-height: 46px;
    cursor: pointer;
  }

  & > li + li {
    margin-top: 30px;
  }

  & > li:last-child {
    margin-top: auto;
    margin-bottom: auto;

    @media (min-width: 768px) {
      margin-bottom: 30px;
    }
  }

  & > li > span {
    position: absolute;
    top: 0;
    right: 4px;
    bottom: 0;
    display: block;
    width: 8px;
    height: 8px;
    margin: auto 10px;
    border-radius: 50%;
    background-color: #000;
  }

  a {
    color: #000;
    text-decoration: none;
  }
`;

// eslint-disable-next-line
export const SideMenuPage = styled(({ active, ...rest }) => <div {...rest} />)`
  position: absolute;
  top: 52px;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
  transition: transform 300ms ease;
  transform: translateX(${(props) => (props.active ? 0 : 'calc(100% + 10px)')});
  z-index: 1;

  @media (min-width: 768px) {
    top: 62px;
    transform: translateX(${(props) => (props.active ? 0 : 438)}px);
  }
`;
