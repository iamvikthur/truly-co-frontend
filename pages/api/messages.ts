import { NextApiRequest, NextApiResponse } from 'next';
import { DiscussionMessage } from '../../lib/models';

const messages: DiscussionMessage[] = [
  {
    messageId: 1,
    messageText: `You got a fast car`,
    sentAt: '2020-10-08T09:15:08.849Z',
    userId: 2,
    userName: 'Second User',
    userAvatar: null,
  },
  {
    messageId: 2,
    messageText: `I want a ticket to anywhere`,
    sentAt: '2020-10-08T10:16:08.849Z',
    userId: 3,
    userName: 'Third User',
    userAvatar: null,
  },
  {
    messageId: 3,
    messageText: `Maybe we make a deal`,
    sentAt: '2020-10-08T11:17:08.849Z',
    userId: 4,
    userName: 'Fourth User',
    userAvatar: null,
  },
  {
    messageId: 4,
    messageText: `Maybe together we can get somewhere`,
    sentAt: '2020-10-08T12:18:08.849Z',
    userId: 1,
    userName: 'John Doe',
    userAvatar: null,
  },
];

export default (req: NextApiRequest, res: NextApiResponse): void => {
  switch (req.method) {
    case 'GET':
      res.status(200).json(messages);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
