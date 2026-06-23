import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chokola-dessert-lounge.vercel.app';
const title = 'Chokola Dessert Lounge | Premium Modern Desserts';
const description =
  'Chokola Dessert Lounge presents elegant chocolate desserts, cakes, pastries, cold sweets, branch location details, and contact information in a premium dessert lounge experience.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: 'Chokola Dessert Lounge',
  keywords: [
    'Chokola',
    'dessert lounge',
    'premium desserts',
    'chocolate desserts',
    'cakes',
    'pastries',
    'sweet lounge',
  ],
  authors: [{ name: 'Chokola Dessert Lounge' }],
  creator: 'Chokola Dessert Lounge',
  publisher: 'Chokola Dessert Lounge',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
    type: 'website',
    url: '/',
    siteName: 'Chokola Dessert Lounge',
    locale: 'en_US',
    images: [
      {
        url: '/chokola-brand-board.png',
        width: 1200,
        height: 630,
        alt: 'Chokola Dessert Lounge brand identity and dessert visuals',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/chokola-brand-board.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
