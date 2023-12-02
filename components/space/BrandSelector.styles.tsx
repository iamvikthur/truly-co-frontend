import styled from 'styled-components';
/* eslint-disable @typescript-eslint/no-unused-vars */

export const BrandSelectorWrapper = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  padding: 22px 0 25px;
  background: rgba(0, 0, 0, 0.5);
  overflow-x: auto;

  & > div {
    display: flex;
  }

  @media (min-width: 768px) {
    top: 0;
    right: auto;
    display: block;
    bottom: 0;
    left: 35px;
    padding: 0;
    background: none;
    overflow: hidden;

    & > div {
      flex-direction: column;
    }

    button {
      margin-right: auto;
      margin-bottom: 20px;
      text-align: left;
    }
  }
`;

export const BrandButton = styled(({ active, forwardRef, ...rest }) => (
  <button ref={forwardRef} {...rest} />
))`
  margin: 0 15px;
  padding: 0;
  background: none;
  border: none;
  border-radius: 0;
  outline: 0;
  color: #fff;
  font-size: 16px;
  line-height: 24px;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
  cursor: pointer;

  img {
    display: block;
  }
`;
