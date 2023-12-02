import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from '../../lib/cookies';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  switch (req.method) {
    case 'POST':
      if (req.body && req.body.email === 'test@email.com' && req.body.password === '123QWEasd!') {
        setCookie(res, 'SESSIONID', 'trulyco-session', {
          maxAge: 60 * 60 * 24,
          path: '/',
          sameSite: 'lax',
          httpOnly: true,
        });
        res.status(200).json({});
      } else {
        res.status(422).json({ error: 'Invalid email/password supplied' });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
