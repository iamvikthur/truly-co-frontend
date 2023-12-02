import ReactPlayer from 'react-player';
import { useContext, useEffect, useRef, useState } from 'react';
import { ButtonPlay, VideoContainer, Player } from './VideoChapter.styles';
import VideoChapterControls from './VideoChapterControls';
import { HeaderContext, VideoContext } from '../../lib/context';
import usePrevious from '../../lib/usePrevious';

interface VideoBGProps {
  active: boolean;
  src: string;
  title: string;
  withSatellite?: boolean;
}

interface ProgressState {
  playedSeconds: number;
  loadedSeconds: number;
}

const VideoChapter = ({ active, src, title, withSatellite }: VideoBGProps) => {
  const { preventVideoPlaying, setVideoIsStartPlaying, setVideoIsSeeking } = useContext(
    VideoContext
  );
  const [, setHeader] = useContext(HeaderContext);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [controlsIsVisible, setControlsIsVisible] = useState(false);
  const [iconPlayIsVisible, setIconPlayIsVisible] = useState(true);
  const [loadedSeconds, setLoadedSeconds] = useState(0);
  const player = useRef<ReactPlayer>(null);
  const prevActive = usePrevious(active);
  const prevPlaying = usePrevious(playing);

  /**
   * Set icon play and controls is visible
   */
  useEffect(() => {
    if (active && prevPlaying !== playing && !playing && prevPlaying) {
      setIconPlayIsVisible(true);
      setTimeout(() => setIconPlayIsVisible(false), 2000);
    }

    if (active !== prevActive && active) {
      setIconPlayIsVisible(true);
    }

    if (active && playing) {
      setControlsIsVisible(true);
    } else if (!active && !playing) {
      setControlsIsVisible(false);
    }
  }, [active, playing, prevPlaying, prevActive]);

  /**
   * if preventPlaying
   * set player to pause
   */
  useEffect(() => {
    if (playing) setPlaying(!preventVideoPlaying);
  }, [playing, preventVideoPlaying]);

  /**
   * Pause the video player if it is playing and the chapter has changed
   */
  useEffect(() => {
    if (active !== prevActive && !active) {
      if (playing) setPlaying(false);
      setVideoIsStartPlaying(false);
    }
  }, [active, playing, prevActive, setVideoIsStartPlaying]);

  /**
   * Sets the hidden state of the header when playing a video player
   */
  useEffect(() => {
    if (!active) return;

    setHeader(([, isAtTheTop, color]) => [!playing, isAtTheTop, color]);
  }, [active, playing, setHeader]);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!player.current) return;

    const value = (e.target as HTMLInputElement).value;
    setCurrentTime(+value);

    if (Math.round(currentTime) === Math.round(player.current.getDuration())) {
      player.current.seekTo(player.current.getDuration());
    } else {
      player.current.seekTo(+value);
      setPlaying(true);
    }
  };

  const handleProgress = (e: ProgressState) => {
    setCurrentTime(e.playedSeconds);
    setLoadedSeconds(e.loadedSeconds);
  };

  return (
    <VideoContainer paused={!playing} withSatellite={withSatellite}>
      <h3>{title}</h3>
      <Player
        height="100%"
        width="100%"
        muted={false}
        playing={playing}
        forwardRef={player}
        playsinline
        url={src}
        onPlay={() => setVideoIsStartPlaying(true)}
        onEnded={() => setPlaying(false)}
        onProgress={(e: ProgressState) => handleProgress(e)}
      />
      <ButtonPlay visible={!playing && iconPlayIsVisible} onClick={handlePlayPause} />
      {player.current && (
        <VideoChapterControls
          currentTime={currentTime}
          loadedSeconds={loadedSeconds}
          max={player.current.getDuration()}
          playing={playing}
          visible={controlsIsVisible}
          onPlayPause={handlePlayPause}
          onChange={handleChange}
          onTouch={setVideoIsSeeking}
        />
      )}
    </VideoContainer>
  );
};

export default VideoChapter;
