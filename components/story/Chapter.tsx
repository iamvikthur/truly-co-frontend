import { useEffect, useRef, memo } from 'react';
import { DiscussionState, StoryDiscussion } from '../../lib/models';
import { CallToSwipe, Section } from './Chapter.styles';
import CrossroadChapter from './CrossroadChapter';
import ReadingUsers from './ReadingUsers';
import SatelliteLink from './SatelliteLink';
import TextChapterContent from './TextChapterContent';
import TextChapterCover from './TextChapterCover';
import VideoChapter from './VideoChapter';

interface ReadingUser {
  avatar: string;
}

interface ChapterProps {
  active: boolean;
  brand: string;
  callToSwipe: boolean;
  chapter: any;
  id?: string;
  readingUsers?: ReadingUser[];
  onScrollTop: (top: number) => void;
  onStartDiscussion: (selectionStart: number, selectionEnd: number, title: string) => void;
}

const Chapter = ({
  active,
  brand,
  callToSwipe,
  chapter,
  id,
  readingUsers,
  onScrollTop,
  onStartDiscussion,
}: ChapterProps) => {
  const chapterRef = useRef<HTMLElement>(null);

  /** Sets scrollTop position */
  useEffect(() => {
    if (!chapterRef.current) return;
    const chapter = chapterRef.current;
    const setTop = () => onScrollTop(chapter.scrollTop);
    if (active) setTop();
    chapter.addEventListener('scroll', setTop);
    return () => chapter?.removeEventListener('scroll', setTop);
  }, [active, onScrollTop]);

  return (
    <Section forwardRef={chapterRef} id={id} isCrossroad={!!chapter.continuations}>
      {!chapter.continuations && chapter.type !== 'video' && (
        <TextChapterCover
          bgColor={chapter.bgColor}
          bgImage={chapter.image}
          embed={chapter.embed}
          epigraph={chapter.epigraph}
          textColor={chapter.textColor}
          title={chapter.title}
        />
      )}

      {chapter.type === 'video' && (
        <VideoChapter
          active={active}
          src={chapter.video}
          title={chapter.title}
          withSatellite={chapter.satelliteTitle && chapter.satelliteSlug}
        />
      )}

      {chapter.htmlContent && (
        <TextChapterContent
          brand={brand}
          content={chapter.htmlContent}
          discussions={chapter.discussions.filter(
            (d: StoryDiscussion) => d.status === DiscussionState.Active
          )}
          onStartDiscussion={onStartDiscussion}
        />
      )}

      {callToSwipe && <CallToSwipe />}

      {chapter.satelliteBrandSlug && chapter.satelliteTitle && (
        <SatelliteLink brand={brand} chapter={chapter} />
      )}

      {chapter.continuations && chapter.continuations.length === 2 && (
        <CrossroadChapter items={chapter.continuations} />
      )}

      {readingUsers && <ReadingUsers active={active} readingUsers={readingUsers} />}
    </Section>
  );
};

export default memo(Chapter);
