import { NextApiRequest, NextApiResponse } from 'next';

const user = {
  id: 1,
  email: 'john.doe@example.com',
  emailConfirmed: true,
  fullName: 'John Doe',
  avatar: '',
  role: 'Admin',
  status: 'active',
  discussions: [
    {
      discussionId: 61236512836,
      discussionTitle: 'New York City',
      lastMessage: 'Zdrasti!',
      messagesCount: 18,
      status: 1,
      storySlug: 'sample-story-1',
      unreadMessagesCount: 12,
    },
    {
      discussionId: 1726312537412,
      discussionTitle: 'harassment in the   LGBTQ+ community',
      lastMessage: 'Hellooooow!',
      messagesCount: 11,
      status: 1,
      storySlug: 'sample-story-1',
      unreadMessagesCount: 10,
    },
    {
      discussionId: 43921823,
      discussionTitle: 'typically held ',
      lastMessage: 'Venenatis eget odio ultricies!',
      messagesCount: 5,
      status: 1,
      storySlug: 'sample-story-1',
      unreadMessagesCount: 3,
    },
    {
      discussionId: 8723613,
      discussionTitle: 'queer folks',
      lastMessage: 'Sed velit neque, venenatis eget odio ultricies!',
      messagesCount: 8,
      status: 1,
      storySlug: 'sample-story-1',
      unreadMessagesCount: 2,
    },
    {
      discussionId: 439277321124,
      discussionTitle: 'location was selected to commemorate the 50th anniversary.',
      lastMessage: 'Hellooooow!',
      messagesCount: 5,
      status: 1,
      storySlug: 'sample-story-3',
      unreadMessagesCount: 1,
    },
    {
      discussionId: 439271237321124,
      discussionTitle: 'homosexual',
      lastMessage: 'Zdrasti!',
      messagesCount: 45,
      status: 1,
      storySlug: 'sample-story-3',
      unreadMessagesCount: 12,
    },
    {
      discussionId: 439232111224,
      discussionTitle: 'Etiam vulputate',
      lastMessage: 'VAYYYaYayayayaya!',
      messagesCount: 13,
      status: 1,
      storySlug: 'sample-story-3',
      unreadMessagesCount: 3,
    },
    {
      discussionId: 439272732224,
      discussionTitle: 'venenatis eget odio ultricies, euismod pharetra leo',
      lastMessage: 'Hellooooow!',
      messagesCount: 3,
      status: 1,
      storySlug: 'sample-story-3',
      unreadMessagesCount: 2,
    },
    {
      discussionId: 4392222171224,
      discussionTitle: 'Etiam vulputate',
      lastMessage: 'Hellooooow!',
      messagesCount: 23,
      status: 1,
      storySlug: 'sample-story-3',
      unreadMessagesCount: 11,
    },
    {
      discussionId: 5392171724,
      discussionTitle: 'Nam consequa',
      lastMessage: 'Hellooooow!',
      messagesCount: 33,
      status: 1,
      storySlug: 'sample-story-3',
      unreadMessagesCount: 9,
    },
    {
      discussionId: 4392171224,
      discussionTitle: 'Text Chapter 4',
      lastMessage: 'Hellooooow!',
      messagesCount: 13,
      status: 1,
      storySlug: 'sample-story-3',
      unreadMessagesCount: 2,
    },
    {
      discussionId: 539217,
      discussionTitle:
        'Nam consequat elit in nibh posuere tincidunt. Sed velit neque, venenatis eget odio ultricies, euismod pharetra leo.Short descriptive text Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      lastMessage: 'Hellooooow!',
      messagesCount: 3,
      status: 1,
      storySlug: 'sample-story-3',
      unreadMessagesCount: 0,
    },
    {
      discussionId: 53123224,
      discussionTitle: 'Text Chapter 11',
      lastMessage: 'Lorem ipsum dolor sit amet!',
      messagesCount: 7,
      status: 1,
      storySlug: 'sample-story-3',
      unreadMessagesCount: 3,
    },
    {
      discussionId: 53923217,
      discussionTitle: 'expression that differs ',
      lastMessage: 'venenatis eget odio ultricies, euismod pharetra leo.Short descriptive!',
      messagesCount: 7,
      status: 1,
      storySlug: 'sample-story-3',
      unreadMessagesCount: 5,
    },
    {
      discussionId: 539212312317,
      discussionTitle: 'entrances',
      lastMessage: 'Hahahaha!',
      messagesCount: 13,
      status: 1,
      storySlug: 'sample-story-3',
      unreadMessagesCount: 1,
    },
  ],
  fundedStories: [
    {
      storySlug: 'sample-crowdfunding-story-1',
      projectId: '1883',
    },
    {
      storySlug: 'sample-crowdfunding-story-2',
      projectId: '1884',
    },
    {
      storySlug: 'sample-crowdfunding-story-3',
      projectId: '1885',
    },
  ],
};

export default (req: NextApiRequest, res: NextApiResponse): void => {
  switch (req.method) {
    case 'GET':
      if (req.cookies.SESSIONID === 'trulyco-session') {
        res.status(200).json(user);
      } else {
        res.status(200).json({});
      }
      break;
    case 'PUT':
      if (req.cookies.SESSIONID === 'trulyco-session') {
        if (req.body && req.body.email === 'already@in.use') {
          res.status(422).json({ error: 'The email is already in use' });
        } else {
          res.status(200).json(user);
        }
      } else {
        res.status(401).json({ error: 'Authentication information is missing or invalid' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
};
