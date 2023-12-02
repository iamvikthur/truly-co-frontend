import { useContext, Suspense } from 'react';
import Link from 'next/link';
import {
  ProfileSupportedList,
  ProfileSupportedProgress,
  ProfileSupportedStats,
} from './ProfileSupported.styles';
import { ProfileContext } from '../../lib/context';
import useUser from '../../lib/useUser';
import useConfig from '../../lib/useConfig';
import ErrorBoundary from '../ErrorBoundary';
import useSWR from 'swr';
import { fetcher } from '../../lib/fetcher';
import { Preloader } from '../space/Preloader';

const FundedStory = ({ slug }) => {
  const config = useConfig();
  const { data } = useSWR(`/api/stories/${slug}`, fetcher, { suspense: true });
  const api = 'https://api.globalgiving.org/api/public/projectservice/projects/';
  const path = `${api}${data.fundingProjectId}?api_key=${config.globalgiving_api_key}`;
  const { data: gg } = useSWR(path, fetcher, { suspense: true });
  const setIsProfileOpened = useContext(ProfileContext)[1];

  const handleStoryClick = () => setIsProfileOpened(false);

  return (
    <Link href={`/[[...story]]`} as={`/${slug}`}>
      <a onClick={handleStoryClick}>
        <p>
          <b>{data.storyName}</b>
        </p>
        <ProfileSupportedProgress progress={gg.project.funding / gg.project.goal}>
          <span />
        </ProfileSupportedProgress>

        <ProfileSupportedStats>
          <p>
            <b>${gg.project.funded}</b>
            <span>${gg.project.goal} goal</span>
          </p>
          <p>
            <b>{gg.project.numberOfDonations}</b>
            <span>Donations</span>
          </p>
          <p>
            <b></b>
            <span></span>
          </p>
        </ProfileSupportedStats>
      </a>
    </Link>
  );
};

const ProfileSupported = () => {
  const { user } = useUser();

  return user.fundedStories?.length ? (
    <ProfileSupportedList>
      {user.fundedStories.map((fundedStory, key) => (
        <li key={key}>
          <ErrorBoundary fallback={<p>Failed to fetch story info</p>}>
            <Suspense fallback={<Preloader />}>
              <FundedStory slug={fundedStory.storySlug} />
            </Suspense>
          </ErrorBoundary>
        </li>
      ))}
    </ProfileSupportedList>
  ) : (
    <p>
      You haven’t supported any stories, yet. You’ll see your donations here, as soon as you support
      a story.
    </p>
  );
};

export default ProfileSupported;
