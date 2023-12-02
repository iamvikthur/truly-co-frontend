import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import imagesLoaded from 'imagesloaded';
import { DiscussionIndicator, DiscussionIndicatorsContainer } from './DiscussionIndicators.styles';
import { IndicatorsListContext } from '../../lib/context';
import { StoryDiscussion } from '../../lib/models';
import useResize from '../../lib/useResize';
import { SELECTED_TAG } from './TextChapterContentData';

export interface Indicator extends StoryDiscussion {
  top?: number;
}

interface DiscussionIndicatorProps {
  discussions: StoryDiscussion[];
  contentRef: HTMLElement;
}

const DiscussionIndicators = ({ discussions, contentRef }: DiscussionIndicatorProps) => {
  const router = useRouter();
  const { story } = router.query;
  const [indicators, setIndiactors] = useState<Indicator[][]>([]);
  const [, setIndicatorsList] = useContext(IndicatorsListContext);
  const [contentIsReady, setContentIsReady] = useState(false);
  const [W] = useResize();

  useEffect(() => {
    if (!contentRef) return;

    const imgLoad = imagesLoaded(contentRef);
    function setReady() {
      setContentIsReady(true);
    }
    imgLoad.on('always', setReady);
    return () => imgLoad.off('always', setReady);
  });

  const setTopPositionForIndicators = useCallback(
    (el: Element) => {
      if (!contentRef) return;

      const { bottom, height } = el.getBoundingClientRect();
      const { top } = contentRef.getBoundingClientRect();
      const { offsetTop } = contentRef;
      const topPosition = bottom - top - height + offsetTop + 7;
      return topPosition;
    },
    [contentRef]
  );

  const setIndicatorsArray = useCallback(() => {
    if (!contentRef || !discussions?.length) return;

    const initIndicators = () => {
      const selectedTags = Array.from(contentRef.getElementsByTagName(SELECTED_TAG));
      const preDiscussions = discussions
        .filter((d: StoryDiscussion) => d.selectionStart !== 0 && d.selectionEnd !== 0)
        .sort((a: StoryDiscussion, b: StoryDiscussion) => a.selectionStart - b.selectionStart);
      const result = [];
      let temp = [];
      let k = 0;
      const indicators: Indicator[] = preDiscussions;

      for (let i = 0; i < selectedTags.length; i++) {
        const next = selectedTags[i + 1] ? selectedTags[i + 1].getBoundingClientRect().top : -1;
        const prev = selectedTags[i - 1] ? selectedTags[i - 1].getBoundingClientRect().top : -1;
        const curr = selectedTags[i].getBoundingClientRect().top;
        if (!indicators[i]) return;
        indicators[i].top = setTopPositionForIndicators(selectedTags[i]);

        if (curr !== prev && curr === next) {
          temp = [];
          temp.push(indicators[i]);
        } else if (curr == next || curr === prev) {
          temp.push(indicators[i]);
          result[i - k] = temp;
          k++;
        } else {
          k--;
          temp = [];
          result.push([indicators[i]]);
        }
      }

      /** filter(Boolean) - clear array from “empty” elements */
      setIndiactors(result.filter(Boolean));
    };

    const mutationObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === 'childList') {
          initIndicators();
        }
      });
    });

    if (contentIsReady) {
      initIndicators();
      mutationObserver.observe(contentRef, { childList: true });
    }

    return () => mutationObserver.disconnect();
  }, [contentIsReady, contentRef, discussions, setTopPositionForIndicators]);

  /** Recalculate positon of indicators when resize */
  useEffect(() => {
    setIndicatorsArray();
  }, [W, setIndicatorsArray]);

  const handleIndicatorClick = (indicator: Indicator[]) => {
    if (indicator.length > 1) {
      setIndicatorsList(indicator);
    } else {
      indicator.forEach((ind: Indicator) => {
        const url = { pathname: `/[[...story]]`, query: { d: ind.discussionId } };
        router.push(url, `/${story}?d=${ind.discussionId}`);
      });
    }
  };

  return (
    <>
      {contentIsReady &&
        indicators?.map((inds: Indicator[], key: number) => (
          <DiscussionIndicatorsContainer
            key={key}
            style={{ top: inds[0].top }}
            onClick={() => handleIndicatorClick(inds)}
          >
            {inds
              .filter((_indicator: Indicator, index: number) => index < 1)
              .map((indicator: Indicator) => (
                <DiscussionIndicator key={indicator.discussionId}></DiscussionIndicator>
              ))}
          </DiscussionIndicatorsContainer>
        ))}
    </>
  );
};

export default DiscussionIndicators;
