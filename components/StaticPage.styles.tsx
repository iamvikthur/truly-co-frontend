import Link from 'next/link';
import styled from 'styled-components';

export const AboutProject = styled(({ ...rest }) => (
  <div {...rest}>
    <Link href="/about">
      <a>About</a>
    </Link>
  </div>
))`
  position: fixed;
  top: 16px;
  left: 11px;
  z-index: 4;

  @media (min-width: 768px) {
    top: 37px;
    right: 150px;
    left: auto;
  }

  a {
    display: inline-block;
    text-decoration: none;
    font-size: 18px;
    line-height: 25px;
    color: #fff;
    border-bottom: 1px solid;
    line-height: 1;
  }
`;

export const CloudLink = styled.a`
  position: fixed;
  top: 10px;
  left: 10px;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const StaticPageContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 70px 10px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 21px;
  font-weight: 300;
  line-height: 1.3;
  overflow-y: auto;
  z-index: 1;

  & > section {
    margin: 0 auto;
    max-width: 800px;
  }

  & > section + section {
    margin-top: 100px;
  }

  h2 {
    margin-bottom: 13px;
    font-size: 50px;
    font-weight: 300;
    text-transform: uppercase;
  }

  h3 {
    font-size: inherit;
  }

  li {
    margin-top: 0.6em;
  }

  /** STYLES FOR ABOUT */

  ol {
    list-style: none;
    padding: 0;
  }

  ol li {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 60px;
    margin-top: 20px;
    padding-left: 80px;

    @media (min-width: 768px) {
      min-height: 100px;
      padding-left: 120px;
    }
  }

  ol li {
    margin-top: 20px;
  }

  ol li > p {
    flex: 0 0 auto;
    width: 100%;
  }

  ol li > p > span {
    background-position: 0 1.2em;
    background-repeat: repeat-x;
    padding-bottom: 4px;

    & > b {
      font-weight: 700;
    }
  }

  ol + h3 {
    margin-top: 30px;

    @media (min-width: 768px) {
      margin-top: 60px;
    }
  }

  p > a {
    display: inline-block;
    text-decoration: none;
    color: #fff;
    border-bottom: 1px solid;
    line-height: 1;
  }

  ol li > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    height: 60px;
    text-align: center;

    @media (min-width: 768px) {
      width: 100px;
      height: 100px;
    }

    & > span {
      display: inline-block;
      width: 53.32px;
      height: 53.32px;
      border: 3px solid;

      @media (min-width: 768px) {
        width: 88.87px;
        height: 88.87px;
      }
    }

    & > img {
      width: 100%;
      height: 100%;
    }
  }

  p + p,
  p + h3,
  h3 + h3,
  h3 + p,
  ul + p {
    margin-top: 1em;
  }

  @media (min-width: 768px) {
    padding: 70px 10px;
    font-size: 34px;

    h2 {
      margin-bottom: 48px;
      font-size: 104px;
    }
  }
`;

export const TeamList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 100px;
  padding: 0 17px 0 13px;

  @media (min-width: 768px) {
    margin-top: 60px;
    padding: 0;

    & + h3 {
      margin-top: 60px;
    }
  }

  & + h3 {
    margin-top: 100px;
  }

  & > div {
    width: calc(50% - 12.5px);
    text-align: center;

    @media (min-width: 768px) {
      width: 25%;
    }

    &:nth-child(2n) {
      margin-left: 25px;

      @media (min-width: 768px) {
        margin-left: 0;
      }
    }

    &:nth-child(1n + 3) {
      margin-top: 20px;

      @media (min-width: 768px) {
        margin-top: 0;
      }
    }

    &:nth-child(1n + 5) {
      @media (min-width: 768px) {
        margin-top: 20px;
      }
    }

    img {
      width: 100px;
      height: 100px;
    }

    p {
      width: 100%;
      font-weight: 700;
    }

    p,
    i {
      display: block;
      font-family: 'Open Sans Condensed', sans-serif;
      font-size: 21px;
      line-height: 1.3;
      color: #fff;
    }
  }
`;
