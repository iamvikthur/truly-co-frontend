import { Suspense, useContext } from 'react';
import { useRouter } from 'next/router';
import useUser from '../../lib/useUser';
import { isSSR } from '../../lib/fetcher';
import { ProfileContext } from '../../lib/context';
import Auth from './Auth';
import EmailVerification from './EmailVerification';
import PasswordReset from './PasswordReset';
import { Panel } from './ProfilePanel.styles';
import SideMenu from './SideMenu';
import ErrorBoundary from '../ErrorBoundary';
import Socials from '../Socials';

const PanelContent = () => {
  const router = useRouter();
  const { user } = useUser();

  if (router.query.reset) return <PasswordReset />;

  if (router.query.verify) return <EmailVerification />;

  return user && user.email ? <SideMenu /> : <Auth />;
};

const ProfilePanel = () => {
  const isOpened = useContext(ProfileContext)[0];

  return (
    <Panel opened={isOpened}>
      {!isSSR && (
        <ErrorBoundary fallback={<p>Couldn&apos;t load profile</p>}>
          <Suspense fallback={<p>Loading profile...</p>}>
            <PanelContent />
            <Socials />
          </Suspense>
        </ErrorBoundary>
      )}
    </Panel>
  );
};

export default ProfilePanel;
