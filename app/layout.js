import { Outfit } from 'next/font/google';
import { Geist_Mono } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import CursorFollower from '@/components/CursorFollower';
import PortfolioFloatBtn from '@/components/PortfolioFloatBtn';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const viewport = {
  themeColor: '#111111',
  colorScheme: 'dark light',
};

export const metadata = {
  title: 'chuck design | Web Design North Port FL | Southwest Florida',
  description: 'Professional web design, development, and SEO for small businesses in North Port, FL (34291) and Southwest Florida. Custom sites built to convert.',
  keywords: 'web design North Port FL, web design Southwest Florida, small business website 34291, SEO North Port Florida',
  authors: [{ name: 'Charles Spivey, chuck design' }],
  metadataBase: new URL('https://chuckdesign.com'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'chuck design — Designs Built to Lead',
    description: 'Web design and development for small businesses in North Port and Southwest Florida.',
    type: 'website',
    url: 'https://chuckdesign.com',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  icons: {
    icon: [{ url: '/images/favicon.svg', type: 'image/svg+xml' }],
    apple: '/images/apple-touch-icon.png',
  },
  other: {
    'geo.region': 'US-FL',
    'geo.placename': 'North Port, Florida',
    'geo.position': '27.0447;-82.1597',
    'ICBM': '27.0447, -82.1597',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'chuck design',
  description: 'Web design, development, and SEO for small businesses in North Port and Southwest Florida',
  url: 'https://chuckdesign.com',
  email: 'charles@chuckdesign.com',
  founder: { '@type': 'Person', name: 'Charles Spivey' },
  areaServed: [
    { '@type': 'City', name: 'North Port' },
    { '@type': 'City', name: 'Sarasota' },
    { '@type': 'City', name: 'Venice' },
    { '@type': 'City', name: 'Englewood' },
    { '@type': 'City', name: 'Port Charlotte' },
  ],
  address: {
    '@type': 'PostalAddress',
    postalCode: '34291',
    addressLocality: 'North Port',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  priceRange: '$$',
  serviceType: ['Web Design', 'Web Development', 'SEO', 'Google Business Profile', 'Social Media Setup', 'Website Maintenance'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://formspree.io" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <PortfolioFloatBtn />
        <CursorFollower />
        <Analytics />
      </body>
    </html>
  );
}
