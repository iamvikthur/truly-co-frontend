import { Header } from './StoryHeader.styles';
import moment from 'moment';

interface StoryHeaderProps {
  authorName: string;
  blackTheme: boolean;
  hidden: boolean;
  publishedAt: string;
  storyName: string;
  textColor?: string;
}

const FormattedDate = (date: string) => {
  return moment(date).calendar(null, {
    sameDay: '[Today]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last week]',
    sameElse: 'MMMM D, Y',
  });
};

const StoryHeader = ({
  authorName,
  blackTheme,
  hidden,
  publishedAt,
  storyName,
  textColor,
}: StoryHeaderProps) => {
  return (
    <Header blackTheme={blackTheme} hidden={hidden} textColor={textColor}>
      <h6>{storyName}</h6>
      <p>by {authorName},</p>
      <p> {FormattedDate(publishedAt)}</p>
    </Header>
  );
};

export default StoryHeader;
