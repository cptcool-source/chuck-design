export default function sitemap() {
  const base = 'https://chuckdesign.com';
  return [
    { url: base,               lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/portfolio`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];
}
