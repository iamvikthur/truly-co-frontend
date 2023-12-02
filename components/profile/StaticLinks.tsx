import { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { ProfileContext } from '../../lib/context';

const Links = styled.div`
  margin-top: auto;

  a {
    color: #000;
  }
`;

const StaticLinks = () => {
  const [, setIsOpened] = useContext(ProfileContext);
  const handleStaticLinkClick = () => setIsOpened(false);

  return (
    <Links>
      <Link href="/terms">
        <a onClick={handleStaticLinkClick}>Terms of Use</a>
      </Link>
    </Links>
  );
};

export default StaticLinks;
