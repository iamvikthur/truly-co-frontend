import styled from 'styled-components';

export const DiscussionIndicator = styled.div`
  width: 9px;
  height: 9px;
  min-width: 9px;
  background-color: #68a278;
  border: 1px solid #fff;
  border-radius: 50%;
`;

export const DiscussionIndicatorsContainer = styled.div`
  position: absolute;
  left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9px;
  height: 9px;
  cursor: pointer;
  z-index: 3;

  & > ${DiscussionIndicator}:nth-child(2) {
    transform: translateX(-4px);
  }

  & > ${DiscussionIndicator}:nth-child(3) {
    transform: translateX(-8px);
  }
`;
