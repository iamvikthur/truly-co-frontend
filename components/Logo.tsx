import { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import lottie from 'lottie-web';
import { Logotype, LottieContainer, LottiePlaceholder } from './Logo.styles';
import { ProfileContext, BrandContext, HeaderContext } from '../lib/context';
import useMobile from '../lib/useMobile';
import LogoBase from './Logo.base';

const Logo = ({ onClick = null }) => {
  const router = useRouter();
  const [isProfileOpened, setIsProfileOpened] = useContext(ProfileContext);
  const [[isHeaderVisible, isAtTheTop, color]] = useContext(HeaderContext);
  const isMobile = useMobile();
  const container = useRef(null);
  const animation = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [brand] = useContext(BrandContext);

  useEffect(() => {
    function loadAnimation() {
      animation.current?.destroy();
      setIsLoaded(false);

      if (brand) {
        // load animation
        animation.current = lottie.loadAnimation({
          container: container.current,
          renderer: 'svg',
          loop: false,
          autoplay: false,
          path: `/logo/${brand === 'originals' ? 'original' : brand}.json`,
          rendererSettings: { progressiveLoad: true },
        });
        // play the first part of the animation
        animation.current.addEventListener('data_ready', () => {
          setIsLoaded(true);
          animation.current.goToAndPlay(0, true);
          animation.current.addEventListener('enterFrame', (e) => {
            if (e.currentTime >= 30) {
              animation.current.removeEventListener('enterFrame');
              animation.current.pause();
              animation.current.goToAndStop(30, true);
            }
          });
        });
      }
    }

    if (animation.current && animation.current.currentFrame >= 30) {
      // try to play the second part of the animation, and then load a new animation
      try {
        animation.current.goToAndPlay(animation.current.currentFrame, true);
        animation.current.addEventListener('complete', loadAnimation);
      } catch {
        loadAnimation();
      }
    } else {
      loadAnimation();
    }
  }, [brand]);

  const handleClick = () => {
    if (isMobile && isProfileOpened) {
      setIsProfileOpened(false);
    }
    onClick && onClick();
  };

  return (
    <Link href="/[[...story]]" as="/" passHref>
      <Logotype
        color={isProfileOpened ? '#000' : router.query?.story ? color : '#fff'}
        visible={isHeaderVisible && isAtTheTop && typeof router.query.d === 'undefined'}
        onClick={handleClick}
      >
        <LogoBase />
        <LottieContainer forwardRef={container} />
        <LottiePlaceholder hidden={isLoaded} />
      </Logotype>
    </Link>
  );
};

export default Logo;
