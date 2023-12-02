import styled from 'styled-components';

const SocialsList = styled.ul`
  position: absolute;
  bottom: 20px;
  right: 10px;

  @media (min-width: 768px) {
    right: 41px;
    bottom: 40px;
  }

  li {
    display: inline-block;
    width: 24px;
    height: 24px;

    & img {
      width: 100%;
      height: 100%;
    }
  }

  li + li {
    margin-left: 24px;
  }
`;

const Socials = () => (
  <SocialsList>
    <li>
      <a href="https://www.facebook.com/bytrulyco" target="_blank" rel="noreferrer">
        <img src="/icons/fb.svg" alt="facebook" />
      </a>
    </li>
    <li>
      <a href="http://instagram.com/bytrulyco" target="_blank" rel="noreferrer">
        <img src="/icons/in.svg" alt="instagram" />
      </a>
    </li>
    <li>
      <a href="http://twitter.com/bytrulyco" target="_blank" rel="noreferrer">
        <img src="/icons/tw.svg" alt="twitter" />
      </a>
    </li>
  </SocialsList>
);

export default Socials;
