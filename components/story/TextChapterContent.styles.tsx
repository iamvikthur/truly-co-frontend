import styled from 'styled-components';
import { ui } from '../../lib/utils';

/** underlines for discussion text */
const maker = `
  background-image: linear-gradient(to bottom, #EC6348 1px, transparent 1px, transparent 2px, #EC6348 2px, #EC6348);
  background-size: 1px 3px;
`;
const timeliner = `
  background-image: linear-gradient(to right, #5b5fa8 3px, transparent 1px);
  background-size: 4px 1px;
`;
const bloomer = `
  background-image: url(/images/underlines/bloomer-underline.png);
  background-size: 4px 4px;
`;
const beyonder = `
  background-image: url(/images/underlines/beyonder-underline.png);
  background-size: 4px 4px;
`;
const outsider = `
  background-image: url(/images/underlines/outsider-underline.png);
  background-size: 3px 4px;
`;
const original = `
  background-image: url(/images/underlines/original-underline.png);
  background-size: 8px 4px;
`;

/** underlines for Quotes */
const makerQuote = `
  background-image: linear-gradient(to right, #EC6348 1px, transparent 1px, transparent 2px, #EC6348 2px, #EC6348);
  background-size: 3px 1px;
`;
const timelinerQuote = `
  background-image: linear-gradient(to bottom, #5b5fa8 3px, transparent 1px);
  background-size: 1px 4px;
`;

const bloomerQuote = `
  background-image: url(/images/underlines/bloomer-underline-quote.png);
  background-size: 4px 4px;
`;

const beyonderQuote = `
  background-image: url(/images/underlines/beyonder-underline-quote.png);
  background-size: 4px 4px;
`;
const outsiderQuote = `
  background-image: url(/images/underlines/outsider-underline-quote.png);
  background-size: 4px 3px;
`;
const originalQuote = `
  background-image: url(/images/underlines/original-underline-quote.png);
  background-size: 4px 8px;
`;

/** Chapter Content (htmlContent) */
// eslint-disable-next-line
export const Content = styled(({ brand, forwardRef, ...rest }) => (
  <div ref={forwardRef} {...rest} />
))`
  position: relative;
  padding: 40px 10px 0;
  flex: 1 0 auto;
  z-index: 3;

  & *::selection {
    background: ${(props) => {
      switch (props.brand) {
        case 'beyonder':
          return '#96D0C3';
        case 'bloomer':
          return '#EFD5DD';
        case 'maker':
          return '#F39554';
        case 'original':
        case 'originals':
          return '#A2D8F6';
        case 'outsider':
          return '#F6EE87';
        case 'timeliner':
          return '#D4D4EC';
        default:
          return '';
      }
    }};
  }

  selection {
    color: inherit;
    font-style: inherit;
  }

  html {
    font-family: Inter,"Open Sans", sans-serif;
  }

  selected {
    padding-bottom: 4px;
    cursor: pointer;
    background-position: 0 1.2em;
    background-repeat: repeat-x;
    ${(props) => {
      switch (props.brand) {
        case 'beyonder':
          return beyonder;
        case 'bloomer':
          return bloomer;
        case 'maker':
          return maker;
        case 'original':
        case 'originals':
          return original;
        case 'outsider':
          return outsider;
        case 'timeliner':
          return timeliner;
        default:
          break;
      }
    }}
  }

  selected a {
    color: inherit;
  }

  pre {
    margin: 10px 0;
  }

  p {
    white-space: normal;
  }

  & > span {
    display: inline-block;
    font-family: Inter, 'Open Sans', sans-serif;
    font-weight: 400;
  }

  pre,
  p,
  blockquote,
  ol > li,
  ul > li,
  & > span {
    font-size: calc((100vw - 36px) / 21);
    line-height: 1.75;
    font-weight: 400;

    @media (min-width: 768px) {
      font-size: calc((414px - 36px - ${() => ui.scrollbarWidth}px) / 21);
    }

    @media (max-height: 789.8px) and (min-width: 768px) {
      font-size: calc((375px - 36px - ${() => ui.scrollbarWidth}px) / 21);
    }
  }

  h6,
  h5,
  h4,
  h3 {
    margin: 0;
    line-height: 1;
    font-weight: 700;
    font-family: Inter, 'Open Sans Condensed', sans-serif;

    & + p {
      margin-top: 20px;
    }

    img + &,
    div + &,
    iframe + &,
    ol + &,
    ul + &,
    p + & {
      margin-top: 30px;
    }

    & + div,
    & + iframe {
      margin-top: 20px;
    }
  }

  h3 + p {
    margin-top: 30px;
  }

  h5,
  h4,
  h3 {
    font-weight: 700;
  }

  h3 {
    font-size: calc((100vw - 36px) / 11.8125);
    text-transform: uppercase;

    @media (min-width: 768px) {
      font-size: calc((414px - 36px - ${() => ui.scrollbarWidth}px) / 11.8125);
    }

    @media (max-height: 789.8px) and (min-width: 768px) {
      font-size: calc((375px - 36px - ${() => ui.scrollbarWidth}px) / 11.8125);
    }
  }

  h4 {
    font-size: calc((100vw - 36px) / 15.75);

    @media (min-width: 768px) {
      font-size: calc((414px - 36px - ${() => ui.scrollbarWidth}px) / 15.75);
    }

    @media (max-height: 789.8px) and (min-width: 768px) {
      font-size: calc((375px - 36px - ${() => ui.scrollbarWidth}px) / 15.75);
    }
  }

  h5,
  h6 {
    font-size: calc((100vw - 36px) / 21);

    @media (min-width: 768px) {
      font-size: calc((414px - 36px - ${() => ui.scrollbarWidth}px) / 21);
    }

    @media (max-height: 789.8px) and (min-width: 768px) {
      font-size: calc((375px - 36px - ${() => ui.scrollbarWidth}px) / 21);
    }
  }

  h6 {
    font-weight: 300;
    font-style: italic;
  }

  pre,
  ol > li,
  ul > li,
  blockquote,
  p {
    font-family: Inter, 'Open Sans', sans-serif;
    font-weight: 400;
  }

  blockquote {
    padding-left: 26px;
    font-style: italic;
    background-position: 0 0;
    background-repeat: repeat-y;
    ${(props) => {
      switch (props.brand) {
        case 'beyonder':
          return beyonderQuote;
        case 'bloomer':
          return bloomerQuote;
        case 'maker':
          return makerQuote;
        case 'original':
        case 'originals':
          return originalQuote;
        case 'outsider':
          return outsiderQuote;
        case 'timeliner':
          return timelinerQuote;
        default:
          break;
      }
    }}
  }

  iframe {
    width: 100%;
    max-width: 100%;
    border: 0;
  }

  img {
    display: block;
    width: 100%;
    object-fit: cover;

    @media (min-width: 768px) {
      height: auto;
    }
  }

  ul,
  ol {
    list-style: none;
    padding-left: 16px;
  }

  ol > li,
  ul > li {
    position: relative;

    b {
      font-weight: 700;
    }
  }

  ul > li {
    padding-left: 26px;
  }

  ul > li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.5em;
    display: block;
    width: ${(props) => (props.brand === 'maker' ? 8 : 10)}px;
    height: ${(props) => (props.brand === 'maker' ? 8 : 10)}px;
    background-image: url(/images/bullets/bulletpoint-${(props) => props.brand}.png);
    background-size: contain;
  }

  ol {
    counter-reset: counter;
  }

  ol > li {
    padding-left: 26px;
  }

  ol > li::before {
    counter-increment: counter;
    content: counter(counter) '.';
    position: absolute;
    left: 0;
    display: block;
    width: 20px;
    font-weight: 400;
  }

  img,
  br {
    user-select: none;
  }

  pre {
    white-space: pre-line;
  }

  & > pre,
  & > h3,
  & > h4,
  & > h5,
  & > h6,
  & > p,
  & > span,
  & > blockquote {
    margin-left: 16px;
  }

  h5 + p,
  li + li {
    margin-top: 10px;
  }

  lottie-player {
    margin: 20px 0;
  }

  p + p,
  p + h3,
  p + h4,
  p + h5,
  p + h6,
  p + img,
  p + span,
  span + p,
  ol + img,
  ul + img,
  p + div,
  ol + div,
  ul + div,
  p + iframe,
  ol + iframe,
  ul + iframe,
  img + h3,
  img + h4,
  img + h5,
  img + h6,
  img + p,
  img + ul,
  img + ol,
  div + h3,
  div + h4,
  div + h5,
  div + h6,
  div + p,
  div + ul,
  div + ol,
  iframe + h3,
  iframe + h4,
  iframe + h5,
  iframe + h6,
  iframe + p,
  iframe + ul,
  iframe + ol,
  ol + h3,
  ol + h4,
  ol + h5,
  ol + h6,
  ul + h3,
  ul + h4,
  ul + h5,
  ul + h6 {
    margin-top: 30px;
  }

  div + img,
  h5 + div,
  iframe + img,
  h5 + iframe,
  p + ul,
  p + ol,
  ul + p,
  ol + p,
  span + ul,
  span + ol,
  ul + span,
  ol + span,
  p + blockquote,
  blockquote + p,
  span + blockquote,
  blockquote + span {
    margin-top: 20px;
  }

  img + img {
    margin-top: 5px;
  }

  & > p a:not([target='_blank']),
  & > a:not([target='_blank']) {
    position: relative;
    padding: 0 10px;
    border: 1px solid;
    border-radius: 50px;
  }

  & p a[target='_blank'],
  & a[target='_blank'] {
    padding: 0;
    border-bottom: 1px solid;
  }

  & p a[target='_blank'],
  & a[target='_blank'],
  & > p a:not([target='_blank']),
  & > a:not([target='_blank']) {
    text-decoration: none;
    color: inherit;
    border-color: ${(props) => {
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
  }
`;

// eslint-disable-next-line
export const StartDiscussionButton = styled(({ forwardRef, visible, ...rest }) => (
  <button ref={forwardRef} {...rest} />
))`
  position: absolute;
  max-width: 170px;
  padding: 6px 19px 10px;
  transform: translateX(-50%);
  color: #000;
  background-color: #fff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  pointer-events: ${(props) => (props.visible ? 'auto' : 'none')};
  transition: opacity 300ms ease, visibility 300ms ease;
  cursor: pointer;
  z-index: 4;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: -3px;
    left: 0;
    margin: 0 auto;
    display: block;
    width: 6px;
    height: 6px;
    background-color: inherit;
    transform: rotate(45deg);
  }

  &:disabled {
    cursor: default;
  }
`;
