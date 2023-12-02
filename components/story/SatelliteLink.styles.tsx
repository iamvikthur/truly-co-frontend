import styled from 'styled-components';
import { ui } from '../../lib/utils';

/** Satellite Container */
// eslint-disable-next-line
export const SatelliteContainer = styled(({ brand, color, ...rest }) => <div {...rest} />)`
  position: relative;
  margin: 38px 10px 0 22px;
  z-index: 2;

  a {
    display: flex;
    align-items: center;
    border-radius: 8px;
    text-decoration: none;
    color: ${(props) => props.color || '#000'};
  }

  a p {
    position: relative;
    font-weight: 300;
    font-size: 14px;
    line-height: 18px;
    padding: 14px 0;

    b {
      font-weight: 700;
    }

    &::after {
      // content: '';
      position: absolute;
      right: 10%;
      bottom: 66%;
      width: calc(100vw - 100% - 40px - ${() => ui.scrollbarWidth}px);
      height: 1px;
      display: block;
      transform: rotate(141deg) scaleX(1.4023233760075866);
      transform-origin: top right;
      background-color: ${(props) => {
        switch (props.brand) {
          case 'beyonder':
            return '#68A278';
          case 'bloomer':
            return '#D8ABD0';
          case 'maker':
            return '#EC6348';
          case 'original':
          case 'originals':
            return '#367FBF';
          case 'outsider':
            return '#EA9C06';
          case 'timeliner':
            return '#2C0560';
          default:
            break;
        }
      }};
      pointer-events: none;
      z-index: 0;

      @media (min-width: 768px) {
        width: calc(414px - 100% - 40px - ${() => ui.scrollbarWidth}px);
      }
    }
  }
`;

/**
 * brand - name of svg file
 */
// eslint-disable-next-line
export const SatelliteImage = styled(({ brand, ...rest }) => <img {...rest} />)`
  width: 50px;
  height: 50px;
  margin-right: 20px;
  ${(props) => props.brand && `-webkit-mask-image: url(/alpha/${props.brand}.svg)`};
  ${(props) => props.brand && `-webkit-mask-size: cover`};
  object-fit: cover;
`;
