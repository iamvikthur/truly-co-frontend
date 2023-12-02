import { useContext } from 'react';
import { StyledHeader } from './Header.styles';
import { ButtonBack, ButtonClose } from './ProfilePanel.styles';
import { ProfileContext } from '../../lib/context';
import useMobile from '../../lib/useMobile';

interface HeaderProps {
  onlyBack?: boolean;
  controlsVisible?: boolean;
  onBack?: () => void;
}

const Header = ({ controlsVisible = true, onlyBack, onBack }: HeaderProps) => {
  const setIsOpened = useContext(ProfileContext)[1];
  const isMobile = useMobile();

  return (
    <StyledHeader style={{ borderBottom: controlsVisible ? `` : 0 }}>
      {onBack && (
        <ButtonBack
          onClick={onBack}
          style={{
            opacity: controlsVisible ? 1 : 0,
            transition: `opacity ${controlsVisible ? 300 : 300}ms ease`,
            pointerEvents: `${controlsVisible ? 'auto' : 'none'}`,
          }}
        />
      )}
      {isMobile && !onlyBack && <ButtonClose onClick={() => setIsOpened(false)} />}
    </StyledHeader>
  );
};

export default Header;
