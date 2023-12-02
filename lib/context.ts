import { createContext, Dispatch, SetStateAction } from 'react';

type Brand = [string, Dispatch<SetStateAction<string>>];
export const BrandContext = createContext<Brand>([null, () => undefined]);

type Profile = [boolean, Dispatch<SetStateAction<boolean>>];
export const ProfileContext = createContext<Profile>([false, () => undefined]);

export type Header = [boolean, boolean, string]; // isVisible, isAtTheTop, color
export type HeaderState = [Header, Dispatch<SetStateAction<Header>>];
export const HeaderContext = createContext<HeaderState>([[true, true, null], () => undefined]);

type Video = {
  preventVideoPlaying: boolean;
  videoIsSeeking: boolean;
  videoIsStartPlaying: boolean;
  setPreventVideoPlaying: (prevent: boolean) => void;
  setVideoIsSeeking: (isSeeking: boolean) => void;
  setVideoIsStartPlaying: (start: boolean) => void;
};

export const VideoContext = createContext<Video>({
  preventVideoPlaying: false,
  videoIsSeeking: false,
  videoIsStartPlaying: false,
  setPreventVideoPlaying: () => undefined,
  setVideoIsSeeking: () => undefined,
  setVideoIsStartPlaying: () => undefined,
});

type ActiveChapter = [number, React.Dispatch<React.SetStateAction<number>>];
export const ActiveChapterContext = createContext<ActiveChapter>([0, () => undefined]);

type IndicatorsList = [any[], React.Dispatch<React.SetStateAction<any[]>>];
export const IndicatorsListContext = createContext<IndicatorsList>([[], () => undefined]);
