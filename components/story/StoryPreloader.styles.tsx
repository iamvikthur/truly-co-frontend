import styled from 'styled-components';

export const Main = styled.div`
  background: #fafafa;
  overflow: hidden;
`;

export const Header = styled.div`
  position: absolute;
  top: 70px;
  right: 10px;
  left: 10px;
  height: 57px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
`;

export const Title = styled((props) => (
  <div {...props}>
    <img src="/alpha/bloomer.svg" alt="" />
    <span />
    <span />
  </div>
))`
  position: absolute;
  top: 170px;
  right: 20px;
  left: 40px;

  & > img {
    position: absolute;
    top: -50%;
    left: -40%;
    width: 250px;
    height: 250px;
    opacity: 0.1;
    animation: imageloading 3s ease-in-out infinite;
  }

  & > span {
    position: relative;
    display: block;
    height: 60px;
    margin-bottom: 12px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 30px;
    overflow: hidden;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
  }

  & > span::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.1);
    animation: loading 1.5s cubic-bezier(0.5, 0, 0.2, 1) infinite;
  }

  & > span:nth-child(2) {
    width: 80%;
  }

  & > span:nth-child(2)::before {
    animation-delay: 100ms;
  }

  @keyframes imageloading {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 0.05;
    }
  }

  @keyframes loading {
    from {
      left: -100%;
      opacity: 1;
    }
    to {
      left: 0;
      opacity: 0;
    }
  }
`;

export const Text = styled((props) => (
  <div {...props}>
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <img src="/alpha/original.svg" alt="" />
  </div>
))`
  position: absolute;
  top: 420px;
  right: 20px;
  left: 40px;

  & > img {
    position: absolute;
    bottom: -50%;
    right: -40%;
    width: 250px;
    height: 250px;
    opacity: 0.1;
    animation: imageloading 3s ease-in-out 1s infinite;
  }

  & > span {
    position: relative;
    display: block;
    height: 21px;
    margin-bottom: 6px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 30px;
    overflow: hidden;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
  }

  & > span::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.1);
    animation: loading 1.5s cubic-bezier(0.5, 0, 0.2, 1) infinite;
  }

  & > span:nth-child(2)::before {
    animation-delay: 60ms;
  }

  & > span:nth-child(3)::before {
    animation-delay: 120ms;
  }

  & > span:nth-child(4)::before {
    animation-delay: 180ms;
  }

  & > span:nth-child(5)::before {
    animation-delay: 240ms;
  }

  & > span:nth-child(6) {
    width: 40%;
  }

  & > span:nth-child(6)::before {
    animation-delay: 140ms;
  }
`;
