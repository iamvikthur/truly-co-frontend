import styled from 'styled-components';

/** Button Change Chapter */
// eslint-disable-next-line
export const ChangeChapterArea = styled(({ hideArrow, rightSide, visible, ...rest }) => (
  <div {...rest} />
))`
  display: none;

  @media (min-width: 768px) {
    position: fixed;
    top: 0;
    bottom: 0;
    display: block;
    height: 100vh;
    z-index: 1;
    cursor: ${(props) =>
        props.visible
          ? `url(/icons/cursor-${props.rightSide ? 'right' : 'left'}.svg) 16 16`
          : 'pointer'},
      pointer;

    ${(props) =>
      props.visible &&
      !props.hideArrow &&
      props.rightSide &&
      `
      &::after {
        content: '';
        position: fixed;
        top: 0;
        left: calc(50vw + 414px / 2 + 40px);
        bottom: 0;
        display: block;
        width: 31px;
        height: 32px;
        margin: auto 0;
        background-image: url(/icons/cursor-right.svg);
      }
    `}
  }

  @media (min-width: 768px) and (max-width: 1023.98px) {
    right: ${(props) => (props.rightSide ? '15vw' : '')};
    left: ${(props) => (props.rightSide ? '' : '15vw ')};
    width: 35vw;
  }

  @media (min-width: 1024px) {
    right: ${(props) => (props.rightSide ? '25vw' : '')};
    left: ${(props) => (props.rightSide ? '' : '25vw')};
    width: 25vw;
  }
`;
