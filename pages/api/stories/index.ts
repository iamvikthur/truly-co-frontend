import { NextApiRequest, NextApiResponse } from 'next';
import cors from 'cors';

const corsMiddleware = cors({
  origin: '*', // Update this with the actual origin of your Next.js app for security
  methods: ['GET'], // Allow only GET requests, adjust based on your needs
});

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  // Apply CORS middleware
  corsMiddleware(req, res);

  const offset = parseInt(req.query.offset as string, 10) || 0;
  const limit = parseInt(req.query.limit as string, 10) || 20;

  try {
    const storiesEndpoint = `${process.env.BASE_URL}/api/stories`;
    const response = await fetch(storiesEndpoint);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data from the API');
    }

    const data = await response.json();

    // Update storyImage URLs to use the IP address directly
    const result = req.query.brand ? 
      data.filter((s: any) => s.brandSlug === req.query.brand) : data;

    result.forEach((story: any) => {
      story.storyImage = `http://143.244.178.155${story.storyImage}`;
      // Use the actual IP address of your backend
    });

    res.status(200).json(result.slice(offset, offset + limit));
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
