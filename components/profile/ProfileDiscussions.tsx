import { useContext } from 'react';
import Link from 'next/link';
import { ProfileDiscussionsList } from './ProfileDiscussions.styles';
import { ProfileContext } from '../../lib/context';
import useUser from '../../lib/useUser';
import { DiscussionState, UserDiscussion } from '../../lib/models';

const ProfileDiscussions = () => {
  const { user } = useUser();
  const setIsProfileOpened = useContext(ProfileContext)[1];

  function discussionsFilter(d: UserDiscussion) {
    return d.status === DiscussionState.Active;
  }

  return user && user.discussions?.filter((d: UserDiscussion) => discussionsFilter(d)).length ? (
    <ProfileDiscussionsList>
      {user.discussions
        .filter((d: UserDiscussion) => discussionsFilter(d))
        .map((d: UserDiscussion) => (
          <li key={d.discussionId}>
            <Link
              href={{
                pathname: `/[[...story]]`,
                query: { d: d.discussionId },
              }}
              as={`${d.storySlug}?d=${d.discussionId}`}
            >
              <a onClick={() => setIsProfileOpened(false)}>
                <h6>
                  <b>{d.discussionTitle}</b>
                </h6>
                <p>Last message: &quot;{d.lastMessage}&quot;</p>
                {!!d.unreadMessagesCount && <span>{d.unreadMessagesCount}</span>}
              </a>
            </Link>
          </li>
        ))}
    </ProfileDiscussionsList>
  ) : (
    <p>
      Start a discussion on any story and you can follow your conversations here. What’s on your
      mind?
    </p>
  );
};

export default ProfileDiscussions;
