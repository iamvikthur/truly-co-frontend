export interface Brand {
  brandSlug: string;
  brandName: string;
}

export interface StoryInfo {
  storySlug: string;
  storyName: string;
  storyImage: string;
  brandSlug: string;
  brandName: string;
  publishedAt: string;
  authorName: string;
  authorAvatar: string;
  type: 'core' | 'satellite' | 'continuation' | 'crowdfunding';
  status: 'draft' | 'published';
  activeDiscussionsCount: number;
  linkedStories: Array<string>;
  tags: Array<string>;
}

export enum DiscussionState {
  Inactive = 0,
  Active = 1,
}

export interface StoryDiscussion {
  discussionId: number;
  title: string;
  status: DiscussionState;
  selectionStart: number;
  selectionEnd: number;
  messagesCount: number;
}

export interface StoryDiscussionBody {
  chapterId: number;
  title: string;
  selectionStart: number;
  selectionEnd: number;
}

export interface ChapterSatellite {
  satelliteSlug: string;
  satelliteTitle: string;
  satelliteImage: string;
  satelliteBrandSlug: string;
}

export interface TextChapter extends ChapterSatellite {
  id: number;
  type: 'text' | 'video' | 'crossroad';
  title: string;
  epigraph: string;
  image: string;
  embed: string;
  audio: string;
  bgColor: string;
  textColor: string;
  htmlContent: string;
  discussions: Array<StoryDiscussion>;
}

export interface VideoChapter extends ChapterSatellite {
  id: number;
  type: 'text' | 'video' | 'crossroad';
  title: string;
  video: string;
  discussions: Array<StoryDiscussion>;
}

export interface CrossroadChapter extends ChapterSatellite {
  id: number;
  type: 'text' | 'video' | 'crossroad';
  continuations: Array<StoryInfo>;
}

export type StoryChapter = TextChapter | VideoChapter | CrossroadChapter;

export interface UserDiscussion {
  discussionId: number;
  discussionTitle: string;
  status: DiscussionState;
  storySlug: string;
  lastMessage: string;
  messagesCount: number;
  unreadMessagesCount: number;
}

export interface UserFundedStory {
  storySlug: string;
  projectId: string;
}

export interface UserProfile {
  id: number;
  email: string;
  emailConfirmed: boolean;
  fullName: string;
  avatar: string;
  role: 'Unverified email' | 'User' | 'Blocked' | 'Admin' | 'Super admin';
  status: string | number;
  discussions: Array<UserDiscussion>;
  fundedStories: Array<UserFundedStory>;
}

export enum MessageType {
  Message = 0,
  Report = 1,
  Auth = 2,
}

export interface IncomingMessage {
  id: number;
  date: string;
  text: string;
  userId?: number;
  userName: string;
  avatar: string;
}

export interface OutgoingMessage {
  userId: number;
  token: string;
  type: MessageType;
  msg: string;
  messageId?: number;
}

export interface DiscussionMessage {
  messageId: number;
  messageText: string;
  sentAt: string;
  userId: number;
  userName: string;
  userAvatar: string;
}
