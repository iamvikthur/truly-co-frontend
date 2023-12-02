import { useEffect, useMemo, useRef, useState } from 'react';
import imagesLoaded from 'imagesloaded';
import { ReadingUsersContainer } from './ReadingUser.styles';
import ReadingUser from './ReadingUser';

interface ReadingUser {
  avatar?: string;
  name?: string;
  id?: string;
}

interface ReadingUsersProps {
  active: boolean;
  readingUsers: ReadingUser[];
}

function generateRandomLetter() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randInitial = (string: string) => string[Math.floor(Math.random() * alphabet.length)];
  return `${randInitial(alphabet)} ${randInitial(alphabet)}`;
}

function preparedReadingUsersArray(arr: ReadingUser[]) {
  let res = arr;
  if (arr.length < 5) {
    [...Array(5)].forEach((_a) => {
      const name = generateRandomLetter();
      res.push({ name: name });
    });
  } else if (arr.length > 9) {
    res = arr.sort(() => Math.random() - 0.5).slice((arr.length / 10) * 2, -1);
  }
  return res;
}

const ReadingUsers = ({ active, readingUsers }: ReadingUsersProps) => {
  const readUsersRef = useRef<HTMLDivElement>();
  const pReadingUsers = useMemo(() => preparedReadingUsersArray(readingUsers), [readingUsers]);
  const [contentIsReady, setContentIsReady] = useState(false);

  useEffect(() => {
    if (!readUsersRef.current) return;
    const imgLoad = imagesLoaded(readUsersRef.current.parentElement || readUsersRef.current);
    function setReady() {
      setContentIsReady(true);
    }
    imgLoad.on('always', setReady);
    return () => imgLoad.off('always', setReady);
  }, []);

  return (
    (pReadingUsers.length && (
      <ReadingUsersContainer
        active={active}
        forwardRef={readUsersRef}
        style={{ height: readUsersRef.current?.parentElement?.scrollHeight || '100%' }}
      >
        {contentIsReady &&
          pReadingUsers.map((a: ReadingUser, i: number) => (
            <ReadingUser
              name={a.name}
              key={i}
              src={a.avatar}
              id={i}
              w={readUsersRef.current?.clientWidth || 414}
              h={readUsersRef.current?.parentElement?.scrollHeight || 3000}
            ></ReadingUser>
          ))}
      </ReadingUsersContainer>
    )) ||
    null
  );
};

export default ReadingUsers;
