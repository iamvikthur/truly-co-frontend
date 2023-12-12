import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const offset = parseInt(req.query.offset as string, 10) || 0;
  const limit = parseInt(req.query.limit as string, 10) || 20;

  try {
    const stories = `${process.env.BASE_URL}/api/stories`; // Assuming '/data' is your API endpoint
    const response = await fetch(stories);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data from the API');
    }

    const data = await response.json();

    const result = req.query.brand ? data.filter((s: any) => s.brandSlug === req.query.brand) : data;

    res.status(200).json(result.slice(offset, offset + limit));
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
