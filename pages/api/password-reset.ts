import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  switch (req.method) {
    case 'POST':
      res.status(200).json({});
      break;
    case 'PUT':
      if (req.body && req.body.newPassword && req.body.token === 'token') {
        res.status(200).json({});
      } else {
        res.status(422).json({ error: 'Invalid token/password supplied' });
      }
      break;
    default:
      res.setHeader('Allow', ['POST', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
