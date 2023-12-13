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
  const { data:storyData } = useSWR(
  story ? `/api/stories/${story}` : null,
  fetcher,
  {
    suspense: true, // Set suspense to false
    onSuccess: (storyData) => { console.log("ONSUCCESS", storyData); setData(storyData.stories) }
  }
);
  
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [data, setData] = useState({});
  const [activeChapter, setActiveCapter] = useState(
    data?.chapters ? data.chapters[activeChapterIndex] : null
  );
  const [storyHeaderIsHidden, setStoryHeaderIsHidden] = useState(false);
  const filteredChapters = useMemo(
    () =>
      data?.chapters?.filter((c: any) =>
        c.type === 'crossroad' ? c.continuations.length === 2 : c
      ) || [],
    [data?.chapters]
  );
  const [hideArrow, setHideArrow] = useState(false);

  console.log("THIS IS DATA", data);
  
  useEffect(() => setActiveChapterIndex(0), [story]);

  useEffect(() => {
    setActiveCapter(data?.chapters ? data.chapters[activeChapterIndex] : null);

    if (activeChapterIndex !== 0) {
      setStoryHeaderIsHidden(true);
    }
  }, [activeChapterIndex, data?.chapters]);

  const handleStoryHeaderHide = useCallback((hidden: boolean) => {
    setStoryHeaderIsHidden(hidden);
  }, []);

  const [, setBrand] = useContext(BrandContext);
  useEffect(() => setBrand(data?.brandSlug || null), [data?.brandSlug, setBrand]);

  if (typeof data === 'undefined') return null;

  if (data.status === 'draft' && user.role !== 'Admin' && user.role !== 'Super admin')
    return <ErrorPage />;

  if (data.type.toLowerCase() === 'crowdfunding') return <CrowdfundingStory data={data} />;

  return (
    <ActiveChapterContext.Provider value={[activeChapterIndex, setActiveChapterIndex]}>
{/*       <NextSeo
        title={data.storyName}
        description={`A story by ${data.authorName}`}
        openGraph={{
          title: data.storyName,
          description: `A story by ${data.authorName}`,
          url: `${process.env.BASE_URL}/${data.storySlug}`,
          type: 'article',
          article: {
            publishedTime: data.createdAt,
            modifiedTime: data.updatedAt,
            tags: data.tags,
          },
          images: [
            {
              url: `${process.env.BASE_URL}${data.storyImage}`,
              width: 512,
              height: 512,
            },
          ],
        }}
      /> */}

      <ChapterHeader
        brand={data.brandSlug}
        indicators={filteredChapters.map((f: TextChapter) => {
          return { color: f.textColor || '' };
        })}
      />

      <StoryHeader
        authorName={data.authorName}
        blackTheme={
          activeChapter && !activeChapter.image && !activeChapter.embed && !activeChapter.bgColor
        }
        hidden={storyHeaderIsHidden || activeChapterIndex !== 0}
        publishedAt={data.publishedAt}
        storyName={data.storyName}
        textColor={activeChapter ? activeChapter.textColor : ''}
      />

      <Chapters
        story={story}
        chapters={filteredChapters}
        readingUsers={data.readingUsers || []}
        brand={data.brandSlug}
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
