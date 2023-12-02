import styled from 'styled-components';

export const Page = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 40px 20px 20px;
  cursor: url(/icons/cross-black.svg) 16 16, pointer;
  z-index: 6;

  a {
    color: #fff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (min-width: 768px) {
    // justify-content: space-between;
    // padding: 50px;
  }
`;

export const Heading = styled.h1`
  margin-bottom: 30px;
  font-size: 34px;
  font-weight: 300;
  line-height: 1.3;

  a {
    color: #000;
    text-decoration: underline;
  }

  & > img {
    display: inline;
    vertical-align: baseline;
    height: 0.9em;
    margin: 0 0.25em -0.1em 0;
    cursor: pointer;
  }

  @media (min-width: 768px) {
    // font-size: 7vw;
  }
`;

export const Footer = styled.div`
  display: none;
  position: absolute;
  bottom: 20px;
  left: 20px;

  & > a:first-child {
    margin-right: 20px;
  }

  @media (min-width: 768px) {
    // bottom: 50px;
    // left: 50px;
  }
`;
