import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const offset = parseInt(req.query.offset as string, 10) || 0;
  const limit = parseInt(req.query.limit as string, 10) || 20;

  try {
    const storiesEndpoint = `${process.env.BASE_URL}/api/stories`;
    const response = await fetch(storiesEndpoint);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data from the API');
    }

    const data = await response.json();

    // Update storyImage URLs to include your base image URL
    const result = req.query.brand ? 
      data.filter((s: any) => s.brandSlug === req.query.brand) : data;

    result.forEach((story: any) => {
      story.storyImage = `${process.env.BASE_URL}/storage/images${story.storyImage}`;
    });

    res.status(200).json(result.slice(offset, offset + limit));
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
