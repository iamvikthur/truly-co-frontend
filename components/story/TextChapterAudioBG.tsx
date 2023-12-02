import { useRef, useEffect, useState, useContext } from 'react';
import { Audio, ButtonMute } from './TextChapterAudioBG.styles';
import usePrevious from '../../lib/usePrevious';
import { HeaderContext } from '../../lib/context';

interface AudioBGProps {
  active: boolean;
  src: string;
}

const TextChapterAudioBG = ({ active, src }: AudioBGProps) => {
  const [[, isAtTheTop]] = useContext(HeaderContext);
  const audio = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(true);
  const prevActive = usePrevious(active);
  const [callToAction, setCallToAction] = useState(true);

  /** Sets muted and paused when chapter is changed */
  useEffect(() => {
    if (!audio.current) return;
    if (active !== prevActive && !active) {
      audio.current.pause();
      setMuted(true);
    }
  }, [active, prevActive]);

  useEffect(() => {
    if (callToAction && !isAtTheTop) {
      setCallToAction(false);
    }
  }, [callToAction, isAtTheTop]);

  async function playVideo() {
    try {
      await audio.current.play();
      setMuted(false);
    } catch (err) {
      // eslint-disable-next-line
      console.log(err);
    }
  }

  function handlePlayButton() {
    if (audio.current.paused) {
      playVideo();
    } else {
      audio.current.pause();
      setMuted(true);
    }
  }

  const handleClickButtonMute = () => {
    handlePlayButton();
  };

  if (!src) return null;

  return (
    <>
      <ButtonMute callToAction={callToAction} muted={muted} onClick={handleClickButtonMute} />
      <Audio ref={audio} src={src} />
    </>
  );
};

export default TextChapterAudioBG;
