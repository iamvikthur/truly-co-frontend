import styled from 'styled-components';

const Zoom = styled.div`
  position: fixed;
  right: 60px;
  bottom: 30px;
  display: flex;
  flex-flow: column nowrap;

  button {
    width: 32px;
    height: 37px;
    border: 1px solid #fff;
    color: #fff;
    font-family: monospace;
    font-size: 17px;
    cursor: pointer;
  }

  button:first-child {
    border-radius: 70px 70px 0 0;
    border-bottom-width: 0;
  }

  button:last-child {
    border-radius: 0 0 70px 70px;
    border-top-width: 0;
  }

  @media (max-width: 767.98px) {
    display: none;
  }
`;

const ZoomInOut = ({ onZoomIn, onZoomOut }) => {
  return (
    <Zoom>
      <button onClick={onZoomIn}>+</button>
      <button onClick={onZoomOut}>-</button>
    </Zoom>
  );
};

export default ZoomInOut;
