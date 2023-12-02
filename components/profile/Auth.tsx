import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import PasswordForgot from './PasswordForgot';
import PasswordReset from './PasswordReset';
import { ButtonClose } from './ProfilePanel.styles';
import Signin from './Signin';
import Signup from './Signup';
import Tab from './Tab';
import { StyledTabs } from './Tab.styles';
import { ProfileContext } from '../../lib/context';
import useMobile from '../../lib/useMobile';
import StaticLinks from './StaticLinks';

const Auth = () => {
  const router = useRouter();
  const [authType, setAuthType] = useState<string>('registration');
  const [forgot, setForgot] = useState(false);
  const setIsOpened = useContext(ProfileContext)[1];
  const isMobile = useMobile();

  const handleClickTab = (value: string) => setAuthType(value);

  if (router.query.reset) return <PasswordReset />;

  if (forgot) return <PasswordForgot onBack={() => setForgot(false)} />;

  return (
    <>
      {isMobile && <ButtonClose onClick={() => setIsOpened(false)} />}
      <StyledTabs>
        <Tab selected={authType === 'login'} onClick={() => handleClickTab('login')}>
          Log in
        </Tab>
        <Tab selected={authType === 'registration'} onClick={() => handleClickTab('registration')}>
          Registration
        </Tab>
      </StyledTabs>
      {authType === 'login' && <Signin onForgotPasswordClick={() => setForgot(true)} />}
      {authType === 'registration' && <Signup />}

      <StaticLinks />
    </>
  );
};

export default Auth;
