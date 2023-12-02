import { ButtonPlayPause, Controls, ProgressBar, Time } from './VideoChapterControls.styles';

interface VideoChapterControlsProps {
  currentTime: number;
  loadedSeconds: number;
  max: number;
  playing: boolean;
  visible: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPlayPause: () => void;
  onTouch: (starting: boolean) => void;
}

const VideoChapterControls = ({
  currentTime,
  loadedSeconds,
  max,
  playing,
  visible,
  onPlayPause,
  onChange,
  onTouch,
}: VideoChapterControlsProps) => {
  return (
    <Controls visible={visible}>
      <ButtonPlayPause paused={!playing} onClick={onPlayPause} />

      <Time>
        <p>
          <span> {Math.floor(currentTime / 60)}</span>:
          <span>
            {+(currentTime - Math.floor(currentTime / 60) * 60).toFixed(0) < 10 ? 0 : ''}
            {+(currentTime - Math.floor(currentTime / 60) * 60).toFixed(0)}
          </span>
          &nbsp;/&nbsp;
        </p>

        <p>
          <span> {Math.floor(max / 60)}</span>:
          <span>{(max - Math.floor(max / 60) * 60).toFixed(0)}</span>
        </p>
      </Time>

      <ProgressBar>
        <progress max={max} value={loadedSeconds} />
        <progress max={max} value={currentTime} />

        <input
          type="range"
          step="0.00001"
          min="0"
          max={max}
          value={currentTime}
          onChange={onChange}
          onTouchStart={() => onTouch(true)}
          onTouchEnd={() => onTouch(false)}
        />
      </ProgressBar>
    </Controls>
  );
};

export default VideoChapterControls;
