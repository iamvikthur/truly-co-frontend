import styled from 'styled-components';

export const StyledHeader = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  width: calc(100% + 20px);
  margin-left: -10px;
  height: 52px;
  padding-top: 10px;
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 3;

  @media (min-width: 768px) {
    height: 62px;
    width: calc(100% + 82px);
    margin-left: -41px;
    background: linear-gradient(to bottom, #fff 0px, #fff 26px, rgba(255, 255, 255, 0) 72px);
    border-bottom: 0;
  }

  & > a {
    display: block;
  }
`;
