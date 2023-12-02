import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  switch (req.method) {
    case 'POST':
      if (req.cookies.SESSIONID === 'trulyco-session') {
        res.status(200).json({});
      } else {
        res.status(401).json({ error: 'Authentication information is missing or invalid' });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
