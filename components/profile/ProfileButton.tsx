import { Suspense, useContext } from 'react';
import { useRouter } from 'next/router';
import { Button } from './ProfileButton.styles';
import ErrorBoundary from '../ErrorBoundary';
import { ProfileContext, HeaderContext } from '../../lib/context';
import { isSSR } from '../../lib/fetcher';
import useUser from '../../lib/useUser';
import Avatar from '../Avatar';

const ProfileImage = () => {
  const { user } = useUser();
  return user && user.email ? (
    <Avatar id={user.id} name={user.fullName} image={user.avatar} />
  ) : (
    <span>Join</span>
  );
};

const ProfileButton = () => {
  const router = useRouter();
  const [isOpened, setIsOpened] = useContext(ProfileContext);
  const [[isHeaderVisible, isAtTheTop, color]] = useContext(HeaderContext);

  const handleClick = () => {
    if (!!router.query.reset || !!router.query.verify) {
      router.replace('/').then(() => setTimeout(() => setIsOpened(true)));
    } else {
      setIsOpened(!isOpened);
    }
  };

  return (
    <Button
      visible={isHeaderVisible && isAtTheTop && typeof router.query.d === 'undefined'}
      color={router.query?.story ? color : '#fff'}
      onClick={handleClick}
    >
      {!isSSR && (
        <ErrorBoundary fallback={<span></span>}>
          <Suspense fallback={<span></span>}>
            <ProfileImage />
          </Suspense>
        </ErrorBoundary>
      )}
    </Button>
  );
};

export default ProfileButton;
