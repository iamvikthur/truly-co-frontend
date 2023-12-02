import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  switch (req.method) {
    case 'PUT':
      if (req.body && req.body.token === 'token') {
        res.status(200).json({});
      } else {
        res.status(422).json({ error: 'Invalid token supplied' });
      }
      break;
    default:
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
