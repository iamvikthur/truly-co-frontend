import { Button, DiscussionIcon } from './DiscussionButton.styles';

interface DiscussionButtonProps {
  hasDiscussions: boolean;
  minimize?: boolean;
  onClick?: () => void;
}

const DiscussionButton = ({ hasDiscussions, minimize, onClick }: DiscussionButtonProps) => {
  return (
    <Button minimize={minimize} onClick={onClick}>
      <p>{'Let’s discuss'}</p>
      <DiscussionIcon
        hasDiscussions={hasDiscussions}
        title={hasDiscussions ? 'Start discussion' : 'Start a new discussion'}
      />
    </Button>
  );
};

export default DiscussionButton;
