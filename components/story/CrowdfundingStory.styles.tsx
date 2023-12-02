import styled from 'styled-components';
import { ui } from '../../lib/utils';
import { Content } from './TextChapterContent.styles';
import { Container } from './TextChapterCover.styles';

export const CrowdfundingStorySection = styled.section`
  height: 100%;
  padding: 115px 10px 0;
  overflow-y: auto;

  @media (min-width: 768px) {
    padding-top: 10px;
  }

  button {
    font-family: 'Open Sans Condensed', sans-serif;
    font-weight: 300;
  }

  & > ${Container} {
    padding: 0 0 0 0;
    min-height: auto;

    h2 {
      margin-bottom: 0;
      font-size: calc((100vw - 20px) / 8.875);
      line-height: 1.2;

      @media (min-width: 768px) {
        font-size: 40px;
      }
    }

    img {
      position: static;
      width: 100%;
      min-height: auto;
      margin-bottom: 30px;
      pointer-events: auto;
    }
  }

  & > ${Content} {
    padding: 30px 0 115px;

    & > h5,
    & > p,
    & > blockquote {
      margin-left: 0;
    }
  }
`;

export const ButtonSupport = styled.button`
  position: absolute;
  right: ${() => ui.scrollbarWidth}px;
  bottom: 20px;
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

  & > a {
    width: 100%;
    height: 100%;
    padding: 0 20px;
    font-family: inherit;
    font-weight: inherit;
    font-size: 16px;
    line-height: 44px;
    color: #fff;
    text-align: center;
    vertical-align: middle;
    text-decoration: none;
  }
`;
