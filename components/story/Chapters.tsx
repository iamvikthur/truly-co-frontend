import { useEffect, useRef, useState, useContext, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import Chapter from './Chapter';
import { ChaptersContainer, Wrapper } from './Chapters.styles';
import DiscussionBlock from './DiscussionBlock';
import DiscussionButton from './DiscussionButton';
import DiscussionsList from './DiscussionsList';
import TextChapterAudioBG from './TextChapterAudioBG';
import {
  ActiveChapterContext,
  HeaderContext,
  IndicatorsListContext,
  VideoContext,
} from '../../lib/context';
import useMobile from '../../lib/useMobile';
import usePrevious from '../../lib/usePrevious';
import { DiscussionState, StoryDiscussion, StoryDiscussionBody } from '../../lib/models';

interface ChaptersProps {
  story: string;
  brand: string;
  chapters: any[];
  readingUsers: [];
  onStoryHeaderHide: (hidden: boolean) => void;
}

const Chapters = ({ story, brand, chapters, readingUsers, onStoryHeaderHide }: ChaptersProps) => {
  const router = useRouter();
  const [activeChapterIndex, setActiveChapterIndex] = useContext(ActiveChapterContext);
  const prevActiveChapterIndex = usePrevious(activeChapterIndex);
  const chaptersContainer = useRef<HTMLDivElement>(null);
  const [discussion, setDiscussion] = useState<StoryDiscussionBody>(null);
  const [, setHeader] = useContext(HeaderContext);
  const [discussionBtnMinimize, setDiscussionBtnMinimize] = useState(false);
  const isMobile = useMobile();
  const prevIsMobile = usePrevious(isMobile);
  const scrollPosition = useRef(0);
  const [indicatorsList, setIndicatorsList] = useState([]);
  const [preventVideoPlaying, setPreventVideoPlaying] = useState(false);
  const [videoIsSeeking, setVideoIsSeeking] = useState(false);
  const [videoIsStartPlaying, setVideoIsStartPlaying] = useState(false);

  const isDiscussionActive = useMemo(() => {
    return (
      !!discussion ||
      chapters.some((c) =>
        c.discussions?.some(
          (d: StoryDiscussion) =>
            d.discussionId === +router.query.d && d.status === DiscussionState.Active
        )
      )
    );
  }, [chapters, discussion, router.query.d]);

  /** Redirect if discussion is not found */
  useEffect(() => {
    if (router.query.story === story && router.query.d && !isDiscussionActive) {
      router.replace({ pathname: `/[[...story]]` }, `/${router.query.story}`);
    }
  }, [isDiscussionActive, router, story]);

  useEffect(() => {
    if (!chapters) return;

    /** Find index of chapter */
    const index = chapters.findIndex((с: any) =>
      с.discussions?.some(
        (d: StoryDiscussion) =>
          d.discussionId === +router.query.d && d.status === DiscussionState.Active
      )
    );

    if (typeof index === 'number' && index !== -1) {
      setActiveChapterIndex(index);
    }
  }, [chapters, router.query.d, setActiveChapterIndex]);

  useEffect(() => {
    if (isMobile) return;

    let b: ScrollBehavior = router.query.d ? 'auto' : 'smooth';
    if (isMobile !== prevIsMobile) {
      b = 'auto';
      setTimeout(() => (b = router.query.d ? 'auto' : 'smooth'), 0);
    }

    scrollChaptersTo(activeChapterIndex, b);
  }, [activeChapterIndex, isMobile, prevIsMobile, router.query.d]);

  /** Change activeChapterIndex when snap | mobile  */
  useEffect(() => {
    if (!chaptersContainer.current) return;

    const container = chaptersContainer.current;
    const chapters = Array.from(container.children) as HTMLElement[];
    if (!chapters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            /** Get active index when isIntersecting */
            const index = Math.floor(container.scrollLeft / container.clientWidth);
            setActiveChapterIndex(index);
          }
        });
      },
      { threshold: 1 }
    );
    /** observe all nodes */
    chapters.forEach((c: HTMLElement) => observer.observe(c));
    /** disconnect observing of all nodes */
    return () => observer.disconnect();
  }, [isMobile, setActiveChapterIndex]);

  const getHeaderColor = useCallback(() => {
    const chapter = chapters[activeChapterIndex];
    return chapter?.type === 'video' || chapter?.type === 'crossroad' ? '#fff' : chapter?.textColor;
  }, [activeChapterIndex, chapters]);

  /** If the chapter is changed
   *  Change the visibility of the header
   *  Reset minimized state of discussion block
   **/
  useEffect(() => {
    if (prevActiveChapterIndex !== activeChapterIndex) {
      setHeader(([, isAtTheTop]) => [
        true,
        typeof prevActiveChapterIndex === 'undefined' ? true : isAtTheTop,
        getHeaderColor(),
      ]);
      setDiscussionBtnMinimize(false);
    }
  }, [chapters, activeChapterIndex, prevActiveChapterIndex, setHeader, getHeaderColor]);

  /** Reset header when closing story */
  useEffect(() => {
    if (router.query.story !== story && typeof router.query.story === 'undefined') {
      setHeader([true, true, null]);
    }
  }, [setHeader, router.query.story, story]);

  /**
   * Disable swipe for mobile version when changing the current time in the video player
   * Minimizes the discussion button when start playing a video
   */
  useEffect(() => {
    if (!chaptersContainer.current) return;

    chaptersContainer.current.style.overflowX = `${videoIsSeeking ? 'hidden' : ''}`;

    /** minimize the discussion button when start playing a video */
    if (videoIsStartPlaying) {
      setDiscussionBtnMinimize(true);
    }
    setPreventVideoPlaying(!!router.query.d || !!discussion);
  }, [discussion, router.query.d, videoIsSeeking, videoIsStartPlaying]);

  /**
   * Scroll chapters when handleChangeChapter
   * @param {Number} index - number of chapter
   */
  const scrollChaptersTo = (index: number, behavior: 'smooth' | 'auto' = 'smooth') => {
    if (!chaptersContainer.current) return;

    const container = chaptersContainer.current;
    const to = container.clientWidth * index;
    container.scrollTo({ left: to, behavior });
  };

  /**
   * callback for scrollTop position
   * @param {Number} top - scrollTop current section
   */
  const handleScrollTop = useCallback(
    (top: number) => {
      const prevTop = scrollPosition.current;
      if (top !== prevTop) {
        /** Sets the hidden state of the header */
        setHeader((h) => {
          const isVisible = isMobile ? top <= 0 || prevTop > top : h[0];
          const isAtTheTop = top <= 0;
          const color = isVisible && !isAtTheTop ? '#000' : getHeaderColor();
          // set state only if values have changed
          return h[0] === isVisible && h[1] === isAtTheTop ? h : [isVisible, isAtTheTop, color];
        });
        onStoryHeaderHide(top !== 0 || (top > 0 && prevTop < top));
      }

      scrollPosition.current = top;
    },
    [isMobile, onStoryHeaderHide, setHeader, getHeaderColor]
  );

  /**  Start Discussion  */
  const handleStartDiscussion = useCallback(
    (selectionStart: number, selectionEnd: number, title: string) => {
      if (!chapters || !chapters[activeChapterIndex]) return;

      setDiscussion({
        chapterId: chapters[activeChapterIndex].id,
        selectionStart: selectionStart,
        selectionEnd: selectionEnd,
        title: title,
      });
    },
    [activeChapterIndex, chapters]
  );

  /** onСlick Event for <selected /> tag
   *  Opens a discussion if the tag has an ID
   */
  useEffect(() => {
    if (!chaptersContainer.current) return;

    const container = chaptersContainer.current;

    const openDiscussion = (el: HTMLElement) => {
      const discussionId = el.getAttribute('id');
      if (discussionId) {
        const optionsURL = { pathname: `/[[...story]]`, query: { d: discussionId } };
        router.push(optionsURL, `/${router.query.story}?d=${discussionId}`);
      }
    };

    const onclick = (e: MouseEvent) => {
      const el = e.target as HTMLElement;

      if (el.tagName === 'SELECTED') {
        openDiscussion(el);
      } else {
        let p = el.parentElement;
        while (p !== e.currentTarget) {
          if (p.tagName === 'SELECTED') {
            openDiscussion(p);
            break;
          } else {
            p = p.parentElement;
          }
        }
      }
    };
    container.addEventListener('click', onclick);
    return () => container.removeEventListener('click', onclick);
  }, [router]);

  /** Start chapter discussion */
  const handleDiscussionButtonClick = () => {
    if (!chapters || !chapters[activeChapterIndex]) return;

    // find chapter discussion
    const foundDiscussion = chapters[activeChapterIndex].discussions.find(
      (d: StoryDiscussion) =>
        d.selectionStart === 0 && d.selectionEnd === 0 && d.status === DiscussionState.Active
    );

    // if discussion exists, open it, otherwise create a new one
    if (foundDiscussion) {
      const url = { pathname: `/[[...story]]`, query: { d: foundDiscussion.discussionId } };
      router.push(url, `/${story}?d=${foundDiscussion.discussionId}`);
    } else {
      router.push({ pathname: `/[[...story]]`, query: { d: '' } }, `/${story}`);
      handleStartDiscussion(0, 0, chapters[activeChapterIndex].title || 'Discussion');
    }
  };

  /** Searches for and opens a discussion of the selected text
   *  or chapter if the router has a "query.d"
   */
  useEffect(() => {
    let foundDiscussion: StoryDiscussion;

    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[i];
      const discussions = chapter.discussions;

      if (discussions) {
        foundDiscussion = discussions.find(
          (d: StoryDiscussion) =>
            d.discussionId === +router.query.d && d.status === DiscussionState.Active
        );
      }

      if (foundDiscussion) {
        const { selectionStart, selectionEnd, title } = foundDiscussion;
        handleStartDiscussion(selectionStart, selectionEnd, title);
        break;
      }
    }
  }, [chapters, handleStartDiscussion, router.query.d]);

  const handleCloseDiscussion = () => {
    setDiscussion(null);
    router.push({ pathname: `/[[...story]]` }, `/${story}`);
  };

  return (
    <Wrapper>
      <IndicatorsListContext.Provider value={[indicatorsList, setIndicatorsList]}>
        <VideoContext.Provider
          value={{
            preventVideoPlaying,
            videoIsStartPlaying,
            videoIsSeeking,
            setPreventVideoPlaying,
            setVideoIsStartPlaying,
            setVideoIsSeeking,
          }}
        >
          <ChaptersContainer ref={chaptersContainer}>
            {chapters.map((c: any, index: number) => (
              <Chapter
                active={index === activeChapterIndex}
                brand={brand}
                callToSwipe={index === 0 && chapters.length > 1 && isMobile}
                chapter={c}
                id={c.id ? c.id : null}
                key={c.id ? c.id : index}
                readingUsers={readingUsers}
                onScrollTop={handleScrollTop}
                onStartDiscussion={handleStartDiscussion}
              />
            ))}
          </ChaptersContainer>
        </VideoContext.Provider>

        {chapters[activeChapterIndex] && chapters[activeChapterIndex].audio && (
          <TextChapterAudioBG
            active={activeChapterIndex === prevActiveChapterIndex}
            src={chapters[activeChapterIndex].audio}
          />
        )}

        <DiscussionBlock
          discussion={discussion}
          active={isDiscussionActive}
          onClose={handleCloseDiscussion}
        />

        {chapters[activeChapterIndex] && !chapters[activeChapterIndex]?.continuations?.length && (
          <DiscussionButton
            minimize={discussionBtnMinimize}
            hasDiscussions={
              chapters[activeChapterIndex] &&
              chapters[activeChapterIndex].discussions?.filter(
                (d: StoryDiscussion) =>
                  d.status === DiscussionState.Active &&
                  d.selectionStart === 0 &&
                  d.selectionEnd === 0
              ).length > 0
            }
            onClick={handleDiscussionButtonClick}
          />
        )}

        {!!indicatorsList.length && <DiscussionsList />}
      </IndicatorsListContext.Provider>
    </Wrapper>
  );
};

export default Chapters;
