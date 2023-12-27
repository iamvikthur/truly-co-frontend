// Import necessary modules
import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';

// Define the API route handler
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const slug = req.query.slug;

  try {
    // Explicitly check the type of slug and handle accordingly
    const storySlug = Array.isArray(slug) ? slug.join('/') : slug;

    // Use process.env.BASE_URL to construct the API URL
    const apiUrl = `${process.env.BASE_URL}/api/stories/${storySlug}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      
      // Update storyImage URLs to use the IP address directly
      // const result = req.query.brand
      //   ? data.filter((s: any) => s.brandSlug === req.query.brand)
      //   : data;

      data.chapters.forEach((chapter) => {
        console.log("CHPATER IMAGE", chapter.image);
        chapter.image = `${process.env.BASE_URL}${chapter?.image}`;
        chapter.audio = `${process.env.BASE_URL}${chapter?.audio}`;
        chapter.video = `${process.env.BASE_URL}${chapter?.video}`;
      });

      data.storyImage = `${process.env.BASE_URL}${data.storyImage}`;

      // Set CORS headers for images
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');

      // Send a successful response with the processed data
      res.status(200).json({
        stories: data,
        // Add any additional data or keys you want to include in the response
      });
    } else {
      // Handle API error response
      res.status(response.status).json({ error: data.message || 'Failed to fetch data from the API' });
    }
  } catch (error) {
    // Handle unexpected errors
    console.error('Error fetching data:', error);
    res.status(500).json({ error: error.toString() });
  }
};
