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

    // Update storyImage URLs to use the IP address directly
    const result = req.query.brand ? 
      data.filter((s: any) => s.brandSlug === req.query.brand) : data;

    // result.forEach((story: any) => {
      // story.storyImage = `https://admin.trulyco.app${story.storyImage}`;
      // Use the actual IP address of your backend
    // });

    // Set CORS headers for images
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET');

     res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*') // replace this your actual origin
    res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    res.status(200).json(result.slice(offset, offset + limit));
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
