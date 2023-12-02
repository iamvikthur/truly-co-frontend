import { NextApiRequest, NextApiResponse } from 'next';

const brands = [
  {
    brandSlug: 'timeliner',
    brandName: 'Timeliner',
  },
  {
    brandSlug: 'beyonder',
    brandName: 'Beyonder',
  },
  {
    brandSlug: 'outsider',
    brandName: 'Outsider',
  },
  {
    brandSlug: 'maker',
    brandName: 'Maker',
  },
  {
    brandSlug: 'bloomer',
    brandName: 'Bloomer',
  },
];

export default (req: NextApiRequest, res: NextApiResponse): void => {
  switch (req.method) {
    case 'GET':
      res.status(200).json(brands);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
