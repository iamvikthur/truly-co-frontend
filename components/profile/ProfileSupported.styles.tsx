import styled from 'styled-components';
import { Preloader } from '../space/Preloader';

export const ProfileSupportedList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  & > li {
    padding: 20px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    & > a {
      color: #000;
      text-decoration: none;
    }

    & > a p + p {
      margin-top: 5px;
    }

    & > ${Preloader} {
      position: initial;
      margin: 0 auto;
      animation: anirotate-inline 10s linear infinite;

      & > div > div {
        background: #000;
      }
    }
  }

  @keyframes anirotate-inline {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-359deg);
    }
  }
`;

// eslint-disable-next-line
export const ProfileSupportedProgress = styled(({ progress, ...rest }) => <div {...rest} />)`
  width: 100%;
  height: 8px;
  margin: 10px 0;
  background-color: #c4c4c4;
  border-radius: 50px;
  overflow-x: hidden;

  span {
    display: block;
    width: 100%;
    height: 100%;
    transform: scaleX(${(props) => props.progress || 1});
    transform-origin: left top;
    background-color: #000;
  }
`;

export const ProfileSupportedStats = styled.div`
  display: flex;

  & > p {
    flex: 1 0 auto;
    display: block;

    span {
      display: block;
      margin-top: 5px;
    }
  }
`;
