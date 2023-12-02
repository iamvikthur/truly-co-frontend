import { useContext, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ActiveChapterContext, HeaderContext } from '../../lib/context';
import useMobile from '../../lib/useMobile';
import usePrevious from '../../lib/usePrevious';
import { CrowdfundingProgress, Header, HeaderElements, IconCloud } from './ChapterHeader.styles';
import ChapterIndicators from './ChapterIndicators';
import LogoSvg from '../Logo.svg';
import ProfileButton from '../profile/ProfileButton';
import { ButtonBack } from '../profile/ProfilePanel.styles';

interface ChapterHeaderProps {
  brand: string;
  crowdfunding?: any;
  crowdfundingSupportIsOpened?: boolean;
  indicators?: { color: string }[];
  onCloseCrowdfundingSupport?: () => void;
}

const ChapterHeader = ({
  brand,
  crowdfunding,
  indicators,
  crowdfundingSupportIsOpened,
  onCloseCrowdfundingSupport,
}: ChapterHeaderProps) => {
  const router = useRouter();
  const [[isHeaderVisible, isAtTheTop, color]] = useContext(HeaderContext);
  const activeIndex = useContext(ActiveChapterContext)[0];
  const secondaryHeader = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  const prevIsMobile = usePrevious(isMobile);

  useEffect(() => {
    if (!secondaryHeader.current) return;

    if (isMobile !== prevIsMobile) {
      secondaryHeader.current.style.transition = 'none';
      setTimeout(() => (secondaryHeader.current.style.transition = ''), 0);
    }
  }, [isMobile, prevIsMobile]);

  const handleCloseCrowdfundingSupport = () => {
    onCloseCrowdfundingSupport();
  };

  return (
    <Header>
      {isMobile && !crowdfunding && (
        <HeaderElements active={isAtTheTop && !router.query?.d} collapsed={!isHeaderVisible}>
          <Link href="/[[...story]]" as="/" passHref>
            <a>
              <IconCloud
                color={
                  color
                    ? color
                    : indicators && indicators[activeIndex] && indicators[activeIndex].color
                }
              />
            </a>
          </Link>
          <ChapterIndicators
            activeIndex={activeIndex}
            brand={brand}
            color={
              color ? color : indicators && indicators[activeIndex] && indicators[activeIndex].color
            }
            count={indicators?.length}
          />
        </HeaderElements>
      )}

      <HeaderElements
        active={crowdfunding ? true : !isAtTheTop && !router.query?.d}
        collapsed={!crowdfunding && !isHeaderVisible}
        forwardRef={secondaryHeader}
        secondary
      >
        {isMobile && (
          <>
            {!crowdfundingSupportIsOpened ? (
              <Link href="/" passHref>
                <a>
                  <IconCloud />
                </a>
              </Link>
            ) : (
              <ButtonBack onClick={handleCloseCrowdfundingSupport} />
            )}

            {!crowdfunding && <LogoSvg />}
            <ProfileButton />
          </>
        )}
        {indicators && !crowdfunding ? (
          <ChapterIndicators
            activeIndex={activeIndex}
            brand={brand}
            color={!isMobile ? '#fff' : ''}
            count={indicators.length}
          />
        ) : (
          <CrowdfundingProgress>
            <progress max={crowdfunding.goal} value={crowdfunding.funding} />
            <p>
              <b>${crowdfunding.funding}</b> raised of <b>${crowdfunding.goal}</b> goal
              <b>{crowdfunding.numberOfDonations}</b> members donated
            </p>
          </CrowdfundingProgress>
        )}
      </HeaderElements>
    </Header>
  );
};

export default ChapterHeader;
