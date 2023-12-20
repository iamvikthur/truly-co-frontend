import { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Chapters from './Chapters';
import ChapterHeader from './ChapterHeader';
import CrowdfundingStory from './CrowdfundingStory';
import { ChangeChapterArea } from './Story.styles';
import StoryHeader from './StoryHeader';
import ErrorPage from '../ErrorPage';
import { ActiveChapterContext, BrandContext } from '../../lib/context';
import { fetcher } from '../../lib/fetcher';
import useUser from '../../lib/useUser';
import { ui } from '../../lib/utils';
import { TextChapter } from '../../lib/models';

const Story = ({ story }) => {
  const router = useRouter();
  const { user } = useUser();
  const { data } = useSWR(
  story ? `/api/stories/${story}` : null,
  fetcher,
  {
    suspense: true, // Set suspense to false
  }
);
  
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [activeChapter, setActiveCapter] = useState(
    data?.stories?.chapters ? data.stories.chapters[activeChapterIndex] : null
  );
  const [storyHeaderIsHidden, setStoryHeaderIsHidden] = useState(false);
  const filteredChapters = useMemo(
    () =>
      data?.stories?.chapters?.filter((c: any) =>
        c.type === 'crossroad' ? c.continuations.length === 2 : c
      ) || [],
    [data?.stories?.chapters]
  );
  const [hideArrow, setHideArrow] = useState(false);
  
  useEffect(() => setActiveChapterIndex(0), [story]);

  useEffect(() => {
    setActiveCapter(data?.stories?.chapters ? data.stories.chapters[activeChapterIndex] : null);

    if (activeChapterIndex !== 0) {
      setStoryHeaderIsHidden(true);
    }

    if (data) {
      data.stories.storyImage = `https://admin.trulyco.app/${data?.stories?.storyImage}`;
    }
    
  }, [activeChapterIndex, data?.stories?.chapters]);

  const handleStoryHeaderHide = useCallback((hidden: boolean) => {
    setStoryHeaderIsHidden(hidden);
  }, []);

  const [, setBrand] = useContext(BrandContext);
  useEffect(() => setBrand(data?.stories?.brandSlug || null), [data?.stories?.brandSlug, setBrand]);

  if (typeof data === 'undefined') return null;

  if (data?.stories?.status === 'draft' && user.role !== 'Admin' && user.role !== 'Super admin')
    return <ErrorPage />;

  if (data?.stories?.type.toLowerCase() === 'crowdfunding') return <CrowdfundingStory data={data.stories} />;

  return (
    <ActiveChapterContext.Provider value={[activeChapterIndex, setActiveChapterIndex]}>
      <NextSeo
        title={data?.stories?.storyName}
        description={`A story by ${data?.stories?.authorName}`}
        openGraph={{
          title: data?.stories?.storyName,
          description: `A story by ${data?.stories?.authorName}`,
          url: `${process.env.BASE_URL}/${data?.stories?.storySlug}`,
          type: 'article',
          article: {
            publishedTime: data?.stories?.createdAt,
            modifiedTime: data?.stories?.updatedAt,
            tags: data?.stories?.tags,
          },
          images: [
            {
              url: `${process.env.BASE_URL}${data?.stories?.storyImage}`,
              width: 512,
              height: 512,
            },
          ],
        }}
      />

      <ChapterHeader
        brand={data?.stories?.brandSlug}
        indicators={filteredChapters.map((f: TextChapter) => {
          return { color: f.textColor || '' };
        })}
      />

      <StoryHeader
        authorName={data?.stories?.authorName}
        blackTheme={
          activeChapter && !activeChapter.image && !activeChapter.embed && !activeChapter.bgColor
        }
        hidden={storyHeaderIsHidden || activeChapterIndex !== 0}
        publishedAt={data?.stories?.publishedAt}
        storyName={data?.stories?.storyName}
        textColor={activeChapter ? activeChapter.textColor : ''}
      />

      <Chapters
        story={story}
        chapters={filteredChapters}
        readingUsers={data?.stories?.readingUsers || []}
        brand={data?.stories?.brandSlug}
        onStoryHeaderHide={handleStoryHeaderHide}
      />

      {!router.query.d &&
        !ui.hasTouch &&
        createPortal(
          <>
            <ChangeChapterArea
              visible={activeChapterIndex !== 0 && !router.query.d}
              onClick={() => setActiveChapterIndex(Math.max(0, activeChapterIndex - 1))}
            />
            <ChangeChapterArea
              hideArrow={hideArrow}
              rightSide
              visible={activeChapterIndex !== filteredChapters.length - 1}
              onClick={() =>
                setActiveChapterIndex(Math.min(filteredChapters.length - 1, activeChapterIndex + 1))
              }
              onMouseEnter={() => setHideArrow(true)}
            />
          </>,
          document.getElementById('__next')
        )}
    </ActiveChapterContext.Provider>
  );
};

export default Story;
