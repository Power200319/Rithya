// generate-sitemap.js
import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';

// Define your base URL
const baseUrl = 'https://university-international.vercel.app';

// Define all your website routes here
const pages = [
  '/',
  '/about',
  '/contact',
  '/admission',
  '/news',
  '/programs'
];

// Create a sitemap stream
const sitemap = new SitemapStream({ hostname: baseUrl });

// Pipe the sitemap stream to a write stream
const writeStream = createWriteStream('./public/sitemap.xml');
sitemap.pipe(writeStream);

// Write each URL into sitemap
pages.forEach(page => {
  sitemap.write({ url: page, changefreq: 'monthly', priority: 0.8 });
});

// End the sitemap
sitemap.end();

// Confirm message
streamToPromise(sitemap).then(() => {
  console.log('✅ Sitemap generated successfully!');
});
