import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import imagesLoaded from 'imagesloaded';
import { Content, StartDiscussionButton } from './TextChapterContent.styles';
import DiscussionIndicators from './DiscussionIndicators';
import { StoryDiscussion } from '../../lib/models';
import {
  ALLOWED_NAMES_TAGS,
  ANCHOR_TAG_REGEX,
  PROHIBITED_NAMES_TAGS,
  REGEX_ID,
  SELECTED_TAG,
  SELECTED_TAGS_LENGTH,
  SELECTED_TAG_REGEX,
  SELECTION_TAG,
  SELECTION_TAGS_LENGTH,
  SELECTION_TAG_REGEX,
  STYLE_ATTR_REGEX,
  TAGS_WITH_DELETING_STYLES_REGEX,
  TAGS_WITH_TRIM_SPACES_REGEX,
} from './TextChapterContentData';

interface TextChapterContentProps {
  brand?: string;
  content: string;
  discussions?: StoryDiscussion[];
  onStartDiscussion?: (selectionStart: number, selectionEnd: number, title: string) => void;
}

const TextChapterContent = ({
  brand,
  content,
  discussions,
  onStartDiscussion,
}: TextChapterContentProps) => {
  const router = useRouter();
  const [contentIsReady, setContentIsReady] = useState(false);
  const selection = useRef<string>('');
  const container = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const [buttonIsVisible, setButtonIsVisible] = useState(false);
  const [outputContent, setOutputContent] = useState('');
  const [preventSelection, setPreventSelection] = useState(false);

  useEffect(() => {
    if (!container.current) return;

    const imgLoad = imagesLoaded(container.current);
    function setReady() {
      setContentIsReady(true);
    }
    imgLoad.on('always', setReady);
    return () => imgLoad.off('always', setReady);
  }, []);

  /** Adding SELECTED_TAG to HTMLcontent */
  useEffect(() => {
    if (!content || !contentIsReady) return;

    let output = content
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .replace(TAGS_WITH_DELETING_STYLES_REGEX, (m: string) =>
        m.replace(STYLE_ATTR_REGEX, '').replace(/\s+>/g, '>')
      )
      .replace(TAGS_WITH_TRIM_SPACES_REGEX, (m: string) => m.trim());

    if (discussions) {
      discussions.sort(
        (a: StoryDiscussion, b: StoryDiscussion) => a.selectionStart - b.selectionStart
      );

      discussions
        /** exclude discussion on the сhapter */
        .filter((d: StoryDiscussion) => d.selectionStart !== 0 && d.selectionEnd !== 0)
        /** add selected tag to html */
        .forEach((d: StoryDiscussion, index: number) => {
          const start = d.selectionStart + index * SELECTED_TAGS_LENGTH;
          const end = d.selectionEnd - SELECTION_TAGS_LENGTH + index * SELECTED_TAGS_LENGTH;
          /** add closing SELECTED_TAG tag */
          output = output.slice(0, end) + `</${SELECTED_TAG}>` + output.slice(end);
          /** add opening SELECTED_TAG tag */
          output = output.slice(0, start) + `<${SELECTED_TAG}>` + output.slice(start);
        });
    }

    setOutputContent(output);
  }, [contentIsReady, discussions, content]);

  /** Add id for selected elements */
  useEffect(() => {
    if (!discussions || !container.current || !contentIsReady) return;

    if (outputContent) {
      const p = container.current;

      const elements = p.getElementsByTagName(SELECTED_TAG);
      const htmlArr = Array.from(elements);

      const preDiscussions = discussions.filter(
        (d: StoryDiscussion) => d.selectionStart !== 0 && d.selectionEnd !== 0
      );

      htmlArr.forEach((el: HTMLElement, index: number) => {
        if (preDiscussions[index] && preDiscussions[index].discussionId) {
          el.setAttribute('id', preDiscussions[index].discussionId.toString());
        }
      });

      container.current = p;
    }
  }, [discussions, contentIsReady, outputContent]);

  /**
   * @param {String} selectedHTML
   */
  const getStartEndPointsSelection = (selectedHTML: string) => {
    const REGEX_ID = /\s(id|class)="[^"]+"/;
    const { innerHTML } = container.current;
    const htmlContent = innerHTML
      .replace(SELECTED_TAG_REGEX, '')
      .replace(/&amp;/g, '&')
      .replace(REGEX_ID, '');
    const selectionHTML = selectedHTML.replace(SELECTED_TAG_REGEX, '').replace(/&amp;/g, '&');
    const selectionStart = htmlContent.indexOf(selectionHTML);
    const selectionEnd = selectionStart + selectionHTML.length;

    return [selectionStart, selectionEnd];
  };

  /**
   * @param {Range} range
   * @param {Boolean} hasSurroundedEl
   */
  const setSelectionFromRange = useCallback(
    (range: Range, hasSurroundedEl: boolean) => {
      const cloned = range.cloneContents(); /** cloned fragment */
      /** create temp <div/> */
      const div = document.createElement('div');
      /** add fragment to <div/> */
      div.appendChild(cloned);
      /** Checking if the child element "SELECTED_TAG" or "ANCHOR TAG" exists in the content  */
      if (div.innerHTML.match(SELECTED_TAG_REGEX) || div.innerHTML.match(ANCHOR_TAG_REGEX)) {
        /** If contains prevent selection */
        setPreventSelection(true);
        /** copy html (fragment) to selection */
        selection.current = div.innerHTML.replace(REGEX_ID, '');
      } else if (!hasSurroundedEl) {
        /** If does not contain allow selection WITH surroundContents */
        setButtonIsVisible(false);
      } else {
        /** If does not contain allow selection WITHOUT surroundContents */
        setPreventSelection(false);
        /** get selectionStart and selectionEnd by selected innerHTML */
        const [selectionStart, selectionEnd] = getStartEndPointsSelection(
          div.innerHTML.replace(REGEX_ID, '')
        );
        discussions.forEach((s: StoryDiscussion) => {
          if (selectionStart >= s.selectionStart && selectionEnd <= s.selectionEnd) {
            setPreventSelection(true);
          }
        });
        /** copy html (fragment) to selection */
        selection.current = div.innerHTML.replace(REGEX_ID, '');
      }
      /** remove <div/> */
      div.remove();
    },
    [discussions]
  );

  /**
   * Set selection
   */
  const setSelection = useCallback(() => {
    if (window.getSelection().type !== 'Range' || !onStartDiscussion) return;

    const sel = window.getSelection();
    const curRange = sel.getRangeAt(0);

    /** Start element */
    const startEl = curRange.startContainer.parentElement;
    /** Parent */
    const startElParent = startEl.parentElement;
    /** End element */
    const endEl = curRange.endContainer.parentElement;
    /** Parent */
    const endElParent = endEl.parentElement;

    /** Selection has Prohibited Tag */
    const startElProhibited = PROHIBITED_NAMES_TAGS.includes(startEl.tagName);
    const endElProhibited = PROHIBITED_NAMES_TAGS.includes(endEl.tagName);

    /** Selection has Allowed Tag */
    const startElAllowed = ALLOWED_NAMES_TAGS.includes(startEl.tagName);
    const endElAllowed = ALLOWED_NAMES_TAGS.includes(endEl.tagName);
    /** Parent */
    const startElParentAllowed = ALLOWED_NAMES_TAGS.includes(startElParent.tagName);
    const endElParentAllowed = ALLOWED_NAMES_TAGS.includes(endElParent.tagName);

    /** Conditions for Allowed tags */
    if (startElAllowed && endElAllowed) {
      if (
        (startEl !== endEl && !startElParentAllowed && !endElParentAllowed) ||
        (startElParent === endElParent && startElParentAllowed && endElParentAllowed)
      ) {
        /** START startEl */
        curRange.setStartBefore(startEl);
        /** END endEl */
        curRange.setEndAfter(endEl);
      } else if (!startElParentAllowed && endElParentAllowed) {
        if (startEl === endElParent) {
          /** END endEl */
          curRange.setEndAfter(endEl);
        } else {
          /** START startEl */
          curRange.setStartBefore(startEl);
          /** END endElParent */
          curRange.setEndAfter(endElParent);
        }
      } else if (startElParent !== endElParent && startElParentAllowed && endElParentAllowed) {
        /** START startElParent */
        curRange.setStartBefore(startElParent);
        /** END endElParent */
        curRange.setEndAfter(endElParent);
      } else if (startElParent !== endEl && startElParentAllowed && !endElParentAllowed) {
        /** START startElParent */
        curRange.setStartBefore(startElParent);
        /** END endEl */
        curRange.setEndAfter(endEl);
      } else if (startElParent === endEl && startElParentAllowed && !endElParentAllowed) {
        /** START startEl */
        curRange.setStartBefore(startEl);
      }
    } else if (startEl !== endEl && !startElAllowed && endElAllowed && !startElParentAllowed) {
      curRange.setEndAfter(!endElParentAllowed ? endEl : endElParent);
    } else if (startElAllowed && !endElAllowed) {
      if (startEl !== endEl && !startElParentAllowed) {
        /** START startEl */
        curRange.setStartBefore(startEl);
      } else if (startEl !== endElParent && startElParentAllowed) {
        /** START startElParent */
        curRange.setStartBefore(startElParent);
      }
    }

    /** Conditions for Prohibited tags */
    if (endElProhibited) {
      curRange.setEndBefore(endEl);
    } else if (startElProhibited) {
      /** If the selection is from right to left <---- */
      curRange.setStartAfter(startEl);
    }

    /** create custom SELECTION_TAG */
    const selectionTag = document.createElement(SELECTION_TAG);

    try {
      /** Add <selection> tag around selected text */
      curRange.surroundContents(selectionTag);
      sel.removeAllRanges();
      sel.addRange(curRange);
      setSelectionFromRange(curRange, true);
    } catch {
      setSelectionFromRange(curRange, false);
    }
  }, [setSelectionFromRange, onStartDiscussion]);

  /**
   * Set button position when text selected
   */
  const setButtonPosition = () => {
    if (!button.current || !container.current) return;

    const sel = window.getSelection();
    const curRange = sel.getRangeAt(0);
    const btnH = button.current.clientHeight;
    const { offsetTop } = container.current;
    const { bottom, height, left, width } = curRange.getBoundingClientRect();
    const containerPoints = container.current.getBoundingClientRect();
    const t = `${bottom - containerPoints.top - height - btnH + offsetTop - 5}px`;
    const l = `${left - containerPoints.left + width - width / 2}px`;
    button.current.style.top = t;
    button.current.style.left = l;
    setButtonIsVisible(true);
  };

  /**
   * Clear HTML from SELECTION_TAG when hint is closing
   */
  useEffect(() => {
    if (!buttonIsVisible && container.current) {
      const selections = container.current.getElementsByTagName(SELECTION_TAG);
      Array.from(selections).forEach((s: HTMLElement) => {
        s.outerHTML = s.innerHTML;
      });
    }
  }, [buttonIsVisible]);

  /**
   * Mouse Events
   */
  useEffect(() => {
    if (!container.current) return;

    const c = container.current;

    /** Reset selection and hide button when mousedown event firing */
    const mousedown = () => {
      window.getSelection().removeAllRanges();
      selection.current = '';
      setButtonIsVisible(false);
    };

    /** Set button position and selection when mouseup event firing */
    const mouseup = () => {
      setSelection();
      if (selection.current) {
        setButtonPosition();
      }
    };

    container.current.addEventListener('mousedown', mousedown);
    container.current.addEventListener('mouseup', mouseup);

    return () => {
      c.removeEventListener('mousedown', mousedown);
      c.removeEventListener('mouseup', mouseup);
    };
  }, [setSelection]);

  /** Click on link */
  useEffect(() => {
    if (!container.current) return;

    const c = container.current;

    const onclick = (e: MouseEvent) => {
      const el = e.target as HTMLAnchorElement;
      /** If target is anchor */
      if (el.tagName === 'A' && el.getAttribute('target') === null) {
        e.preventDefault();
        router.push(`/[[...story]]`, `/${el.pathname.replace('/', '')}`);
      }
    };

    c.addEventListener('click', onclick);
    return () => c.removeEventListener('click', onclick);
  }, [router]);

  const handleClickDiscussionButton = () => {
    if (!selection.current || !container.current || preventSelection || !onStartDiscussion) return;

    let preparedSelection = selection.current;

    ALLOWED_NAMES_TAGS.forEach((p: string) => {
      const regex = new RegExp(`<(${p.toLocaleLowerCase()}|/${p.toLocaleLowerCase()})[^>]*>`, 'g');
      preparedSelection = preparedSelection.replace(regex, '');
    });

    const [selectionStart, selectionEnd] = getStartEndPointsSelection(selection.current);
    onStartDiscussion(
      selectionStart,
      selectionEnd,
      preparedSelection.replace(SELECTION_TAG_REGEX, '').replace(ANCHOR_TAG_REGEX, '')
    );
    setButtonIsVisible(false);
  };

  return (
    <>
      {onStartDiscussion && (
        <StartDiscussionButton
          disabled={preventSelection ? true : false}
          forwardRef={button}
          visible={buttonIsVisible}
          onClick={handleClickDiscussionButton}
        >
          {preventSelection ? 'To start discussion please select another text' : 'Start discussion'}
        </StartDiscussionButton>
      )}
      <Content
        brand={brand}
        dangerouslySetInnerHTML={{ __html: outputContent }}
        forwardRef={container}
      />

      {onStartDiscussion && (
        <DiscussionIndicators discussions={discussions} contentRef={container.current} />
      )}
    </>
  );
};

export default TextChapterContent;
