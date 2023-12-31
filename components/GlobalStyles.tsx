import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  #__next-prerender-indicator {
    display: none;
  }

  html {
    font-family: 'Open Sans Condensed', sans-serif;
    background: #0c0a0a;
  }

  #__next {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #0c0a0a;
    color: #fff;
  }

  main {
    position: absolute;
    width: 100%;
    height: 100%;
    color: #000;
    pointer-events: none;
    overflow: hidden;
    z-index: 2;

    & > div {
      position: absolute;
      width: 100%;
      height: 100%;
      background: #fff;
      pointer-events: auto;
    }

    & > div + div::before {
      content: '';
      position: absolute;
      tpo: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: url(/images/satellite-link.svg) 50% 50% no-repeat;
      background-size: contain;
    }
  }

  @media (min-width: 768px) {
    main {
      top: 0;
      bottom: 0;
      box-sizing: content-box;
      width: 414px;
      height: 736px;
      margin: auto 0;
      padding: 41px 42px 0;

      & > div {
        width: 414px;
        height: 736px;
      }
    }
  }

  @media (max-height: 789.8px) and (min-width: 768px) {
    main {
      width: 375px;
      height: 88vh
      max-height: 736px;

      & > div {
        width: 375px;
        height: 88vh
        max-height: 736px;
      }
    }
  }

  canvas {
    outline: none;
  }

  /**
   * BEGIN FORM STYLES
   */

  form input {
    /** RESET  */
    border: 0;
    border-radius: 0;
    background: none;
    padding: 0;
    outline: 0;
    appearance: none;
  }

  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }

  button {
    /** RESET  */
    padding: 0;
    background: none;
    outline: none;
    border: none;
    border-radius: 0;
    appearance: none;
  }

  form input[type='submit'] {
    display: inline-block;
    width: 50%;
    margin-top: 60px;
    padding: 14px 32px;
    font-family: 'Open Sans Condensed', sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 22px;
    background-color: #000;
    border-radius: 90px;
    color: #fff;
    cursor: pointer;
  }


  form input[type='submit'] + a {
    width: 50%;
    width: 50%;
    margin-top: 60px;
    padding: 14px 32px;
    font-family: 'Open Sans Condensed', sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 22px;
    color: #000;
    text-decoration: none;

  }

  form input + input {
    margin-top: 20px;
  }

  /**
   * FORGOT PASSWORD
   */
  form input[type='submit'] + button {
    width: 50%;
    font-family: 'Open Sans Condensed', sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 22px;
    color: #000;
    cursor: pointer;
  }

  /**
   * END FORM STYLES
   */

  /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

  /* Document
   ========================================================================== */

  /**
   * 1. Correct the line height in all browsers.
   * 2. Prevent adjustments of font size after orientation changes in iOS.
   */

  html {
    line-height: 1.15; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }

  /* Sections
   ========================================================================== */

  /**
   * Remove the margin in all browsers.
   */

  body,
  h2,
  h3,
  ul,
  p {
    margin: 0;
  }

  /**
   * Render the 'main' element consistently in IE.
   */

  main {
    display: block;
  }

  /**
   * Correct the font size and margin on 'h1' elements within 'section' and
   * 'article' contexts in Chrome, Firefox, and Safari.
   */

  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }

  /* Grouping content
   ========================================================================== */

  /**
   * 1. Add the correct box sizing in Firefox.
   * 2. Show the overflow in Edge and IE.
   */

  hr {
    box-sizing: content-box; /* 1 */
    height: 0; /* 1 */
    overflow: visible; /* 2 */
  }

  /**
   * 1. Correct the inheritance and scaling of font size in all browsers.
   * 2. Correct the odd 'em' font sizing in all browsers.
   */

  pre {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }

  /* Text-level semantics
   ========================================================================== */

  /**
   * Remove the gray background on active links in IE 10.
   */

  a {
    background-color: transparent;
  }

  /**
   * 1. Remove the bottom border in Chrome 57-
   * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
   */

  abbr[title] {
    border-bottom: none; /* 1 */
    text-decoration: underline; /* 2 */
    text-decoration: underline dotted; /* 2 */
  }

  /**
   * Add the correct font weight in Chrome, Edge, and Safari.
   */

  b,
  strong {
    font-weight: bolder;
  }

  /**
   * 1. Correct the inheritance and scaling of font size in all browsers.
   * 2. Correct the odd 'em' font sizing in all browsers.
   */

  code,
  kbd,
  samp {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }

  /**
   * Add the correct font size in all browsers.
   */

  small {
    font-size: 80%;
  }

  /**
   * Prevent 'sub' and 'sup' elements from affecting the line height in
   * all browsers.
   */

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  /* Embedded content
   ========================================================================== */

  /**
   * Remove the border on images inside links in IE 10.
   */

  img {
    border-style: none;
  }

  /* Forms
   ========================================================================== */

  /**
   * 1. Change the font styles in all browsers.
   * 2. Remove the margin in Firefox and Safari.
   */

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
    line-height: 1.15; /* 1 */
    margin: 0; /* 2 */
  }

  /**
   * Show the overflow in IE.
   * 1. Show the overflow in Edge.
   */

  button,
  input {
    /* 1 */
    overflow: visible;
  }

  /**
   * Remove the inheritance of text transform in Edge, Firefox, and IE.
   * 1. Remove the inheritance of text transform in Firefox.
   */

  button,
  select {
    /* 1 */
    text-transform: none;
  }

  /**
   * Correct the inability to style clickable types in iOS and Safari.
   */

  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: button;
  }

  /**
   * Remove the inner border and padding in Firefox.
   */

  button::-moz-focus-inner,
  [type='button']::-moz-focus-inner,
  [type='reset']::-moz-focus-inner,
  [type='submit']::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  /**
   * Restore the focus styles unset by the previous rule.
   */

  button:-moz-focusring,
  [type='button']:-moz-focusring,
  [type='reset']:-moz-focusring,
  [type='submit']:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  /**
   * Correct the padding in Firefox.
   */

  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }

  /**
   * 1. Correct the text wrapping in Edge and IE.
   * 2. Correct the color inheritance from 'fieldset' elements in IE.
   * 3. Remove the padding so developers are not caught out when they zero out
   *    'fieldset' elements in all browsers.
   */

  legend {
    box-sizing: border-box; /* 1 */
    color: inherit; /* 2 */
    display: table; /* 1 */
    max-width: 100%; /* 1 */
    padding: 0; /* 3 */
    white-space: normal; /* 1 */
  }

  /**
   * Add the correct vertical alignment in Chrome, Firefox, and Opera.
   */

  progress {
    vertical-align: baseline;
  }

  /**
   * Remove the default vertical scrollbar in IE 10+.
   */

  textarea {
    overflow: auto;
  }

  /**
   * 1. Add the correct box sizing in IE 10.
   * 2. Remove the padding in IE 10.
   */

  [type='checkbox'],
  [type='radio'] {
    box-sizing: border-box; /* 1 */
    padding: 0; /* 2 */
  }

  /**
   * Correct the cursor style of increment and decrement buttons in Chrome.
   */

  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }

  /**
   * 1. Correct the odd appearance in Chrome and Safari.
   * 2. Correct the outline style in Safari.
   */

  [type='search'] {
    -webkit-appearance: textfield; /* 1 */
    outline-offset: -2px; /* 2 */
  }

  /**
   * Remove the inner padding in Chrome and Safari on macOS.
   */

  [type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  /**
   * 1. Correct the inability to style clickable types in iOS and Safari.
   * 2. Change font properties to 'inherit' in Safari.
   */

  ::-webkit-file-upload-button {
    -webkit-appearance: button; /* 1 */
    font: inherit; /* 2 */
  }

  /* Interactive
   ========================================================================== */

  /*
   * Add the correct display in Edge, IE 10+, and Firefox.
   */

  details {
    display: block;
  }

  /*
   * Add the correct display in all browsers.
   */

  summary {
    display: list-item;
  }

  /* Misc
   ========================================================================== */

  /**
   * Add the correct display in IE 10+.
   */

  template {
    display: none;
  }

  /**
   * Add the correct display in IE 10.
   */

  [hidden] {
    display: none;
  }
`;

export default GlobalStyles;
