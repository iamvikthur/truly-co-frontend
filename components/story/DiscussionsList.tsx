import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { List } from './DiscussionsList.styles';
import { Indicator } from './DiscussionIndicators';
import { IndicatorsListContext } from '../../lib/context';

const DiscussionsList = () => {
  const router = useRouter();
  const [indicatorsList, setIndicatorsList] = useContext(IndicatorsListContext);
  const [active, setActive] = useState(false);
  const list = useRef<HTMLUListElement>(null);

  /** Sets active to true when the component is mounted */
  useEffect(() => {
    const timeoutID = setTimeout(() => setActive(true), 0);
    return () => clearTimeout(timeoutID);
  }, []);

  useEffect(() => {
    let timeoutID: undefined | number;

    onclick = (event: MouseEvent) => {
      if (!list.current) return;

      const isClickInside = list.current.contains(event.target as Node);
      /** If the click occurs outside, the discussion list is closed and emptied */
      if (!isClickInside && active) {
        setActive(false);
        timeoutID = setTimeout(() => setIndicatorsList([]), 300);
      }
    };

    document.addEventListener('click', onclick);
    return () => {
      clearTimeout(timeoutID);
      document.removeEventListener('click', onclick);
    };
  }, [active, setIndicatorsList]);

  return (
    <List active={active} forwardRef={list}>
      <li>
        <h5>Discussions:</h5>
      </li>
      {indicatorsList &&
        indicatorsList.map((indicator: Indicator) => (
          <li key={indicator.discussionId}>
            <Link
              href={{
                pathname: `/[[...story]]`,
                query: { d: indicator.discussionId },
              }}
              as={`${router.asPath}?d=${indicator.discussionId}`}
            >
              <a>
                <span>{indicator.messagesCount}</span>
                <p>“...{indicator.title}...”</p>
              </a>
            </Link>
          </li>
        ))}
    </List>
  );
};

export default DiscussionsList;
