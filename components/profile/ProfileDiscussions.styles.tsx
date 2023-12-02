import styled from 'styled-components';

export const ProfileDiscussionsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  & > li {
    position: relative;
    padding: 20px 35px 20px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 16px;
    line-height: 1;
    cursor: pointer;

    h6 {
      font-size: inherit;
      line-height: inherit;
      margin: 0 0 5px;
      padding-right: 32px;

      b {
        font-weight: 600;
      }
    }

    & > a {
      color: #000;
      text-decoration: none;
    }

    p {
      font-weight: 300;
    }

    span {
      position: absolute;
      top: 20px;
      right: 4px;
      display: inline-block;
      min-width: 18px;
      height: 18px;
      padding: 0 6px;
      border-radius: 70px;
      background-color: #000;
      text-align: center;
      vertical-align: middle;
      font-style: normal;
      font-weight: 300;
      font-size: 14px;
      line-height: 18px;
      color: #fff;
    }
  }
`;
