import styled from 'styled-components';
import { ui } from '../../lib/utils';

/** Cover Chapter */
// eslint-disable-next-line
export const Container = styled(({ bgColor, bgImage, embed, textColor, ...rest }) => (
  <div {...rest} />
))`
  position: relative;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  padding: 169px 10px 0 26px;
  min-height: ${(props) =>
    props.bgColor || props.bgImage || props.embed ? 'calc(100% + 93px)' : 'auto'};
  ${(props) => props.bgColor && `background-color: ${props.bgColor};`}
  z-index: 1;

  ${(props) =>
    props.bgImage &&
    `img {
      position: absolute;
      width: 100%;
      min-height: 100%;
      top: 0;
      left: 0;
      object-fit: cover;
      pointer-events: none;
  }`}

  h2,
  p {
    flex: 0 0 auto;
    color: ${(props) => props.textColor || '#000'};
    font-weight: 300;
    z-index: 1;
  }

  p {
    margin-bottom: ${(props) => (props.bgColor || props.bgImage || props.embed ? 'auto' : '66px')};
    font-size: calc((100vw - 36px) / 13.5);
    line-height: 1.2;
    white-space: pre-line;

    @media (min-width: 768px) {
      // font-size: 28px;
      font-size: calc((414px - 36px - ${() => ui.scrollbarWidth}px) / 13.5);
    }

    @media (max-height: 789.8px) and (min-width: 768px) {
      font-size: calc((375px - 36px - ${() => ui.scrollbarWidth}px) / 13.5);
    }
  }

  h2 {
    font-size: calc((100vw - 36px) / 6.872727272727273);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 38px;

    @media (min-width: 768px) {
      // font-size: 55px;
      font-size: calc((414px - 36px - ${() => ui.scrollbarWidth}px) / 6.872727272727273);
    }

    @media (max-height: 789.8px) and (min-width: 768px) {
      font-size: calc((375px - 36px - ${() => ui.scrollbarWidth}px) / 6.872727272727273);
    }

    & + p {
      margin-top: ${(props) => (props.bgColor || props.bgImage || props.embed ? 'auto' : '40px')};
      margin-bottom: ${(props) =>
        props.bgColor || props.bgImage || props.embed ? 'auto' : '20px'};
      font-size: calc((100vw - 36px) / 18);

      @media (min-width: 768px) {
        // font-size: 21px;
        font-size: calc((414px - 36px - ${() => ui.scrollbarWidth}px) / 18);
      }

      @media (max-height: 789.8px) and (min-width: 768px) {
        font-size: calc((375px - 36px - ${() => ui.scrollbarWidth}px) / 18);
      }
    }
  }
`;

export const EmbedContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 62px 0 0;

  @media (min-width: 768px) {
    padding: 0;
  }

  lottie-player,
  iframe {
    width: 100% !important;
    height: 100% !important;
  }
`;
