import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { mutate } from 'swr';
import Header from './Header';
import Profile from './Profile';
import ProfileDiscussions from './ProfileDiscussions';
import ProfileSupported from './ProfileSupported';
import { SideMenuList, SideMenuContainer, SideMenuPage } from './SideMenu.styles';
import useUser from '../../lib/useUser';
import { ProfileContext } from '../../lib/context';
import StaticLinks from './StaticLinks';
import Link from 'next/link';
import { DiscussionState, UserDiscussion } from '../../lib/models';

const SideMenu = () => {
  const { user } = useUser();
  const [isProfileOpened, setIsProfileOpened] = useContext(ProfileContext);
  const [activePage, setActivePage] = useState<'profile' | 'discussions' | 'supported' | ''>('');
  const [isPageOpened, setIsPageOpened] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  useEffect(() => {
    if (!isProfileOpened) {
      setIsPageOpened(false);
      setIsEditingPassword(false);
      setTimeout(() => setActivePage(''), 300);
    }
  }, [isProfileOpened]);

  const handleOpenPage = (page: 'profile' | 'discussions' | 'supported' | '') => {
    setActivePage(page);
    setIsPageOpened(true);
  };

  const handleBack = () => {
    if (!isEditingPassword) {
      setIsPageOpened(false);
      setTimeout(() => setActivePage(''), 300);
    } else {
      setIsEditingPassword(false);
    }
  };

  const handleLogout = () => {
    fetch(`/api/session`, {
      method: 'DELETE',
    })
      .then(() => mutate(`/api/my-profile`))
      .catch(() => undefined);
  };

  const handleEditPassword = () => {
    setIsEditingPassword(true);
  };

  const page = useMemo(() => {
    switch (activePage) {
      case 'profile':
        return (
          <Profile isEditingPassword={isEditingPassword} onEditPassword={handleEditPassword} />
        );
      case 'discussions':
        return <ProfileDiscussions />;
      case 'supported':
        return <ProfileSupported />;
      default:
        return null;
    }
  }, [activePage, isEditingPassword]);

  return (
    <SideMenuContainer>
      <Header onBack={handleBack} controlsVisible={isPageOpened} />
      <SideMenuList active={!isPageOpened}>
        <li onClick={() => handleOpenPage('discussions')}>
          Discussions
          {user?.discussions?.filter((d: UserDiscussion) => d.status === DiscussionState.Active)
            .length > 0 && <span />}
        </li>
        <li onClick={() => handleOpenPage('supported')}>
          Supported
          {user?.fundedStories?.length > 0 && <span />}
        </li>
        <li onClick={() => handleOpenPage('profile')}>Profile</li>
        <li>
          <Link href="/about">
            <a onClick={() => setIsProfileOpened(false)}>About</a>
          </Link>
        </li>
        <li onClick={handleLogout}>Logout</li>
      </SideMenuList>
      <SideMenuPage active={isPageOpened}>{page}</SideMenuPage>
      <StaticLinks />
    </SideMenuContainer>
  );
};

export default memo(SideMenu);
