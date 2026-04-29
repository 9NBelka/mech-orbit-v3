import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.scss';

export const metadata: Metadata = {
  title: 'CRM для автосервісу з відеоконтролем постів | MECH Orbit',
  description:
    'MECH Orbit — перша в Україні відеоCRM для автосервісу. AI-камери, додаток для механіка та власника авто. Контроль постів, прозорість, прибуток.',
  keywords: [
    'CRM для автосервісу',
    'програма для СТО',
    'відеоCRM',
    'облік автосервісу',
    'програма для автосервісу',
    'CRM СТО',
    'керування автосервісом',
    'додаток для механіка',
  ],
  authors: [{ name: 'MECHORBIT OÜ' }],
  robots: { index: true, follow: true },
  verification: { google: '-kUrdMNH0_rdY0cg1-d_KHZfPEquiVpoJW-1EpIqQhE' },

  openGraph: {
    title: 'CRM для автосервісу з відеоконтролем постів | MECH Orbit',
    description:
      'Перша в Україні відеоCRM для автосервісу: AI-камери, два мобільні додатки, прозорий контроль постів.',
    type: 'website',
    url: 'https://mechorbit.com',
    siteName: 'MECH Orbit',
    locale: 'uk_UA',
    images: [{ url: 'https://mechorbit.com/mechMetalLogo.jpg' }],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'CRM для автосервісу з відеоконтролем постів | MECH Orbit',
    description:
      'Перша в Україні відеоCRM для автосервісу. AI-камери, додаток для механіка та власника авто.',
    site: '@mech_orbit',
    images: ['https://mechorbit.com/mechMetalLogo.jpg'],
  },

  alternates: {
    canonical: 'https://mechorbit.com/ua',
    languages: {
      uk: 'https://mechorbit.com/ua',
      en: 'https://mechorbit.com/en',
      ru: 'https://mechorbit.com/ru',
      'x-default': 'https://mechorbit.com/en',
    },
  },

  icons: {
    icon: [
      { url: '/faviconLogo.png', sizes: '32x32', type: 'image/png' },
      { url: '/faviconLogo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/faviconLogo.png', sizes: '180x180' }],
  },
};

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'MECH Orbit',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'CRM для автосервісу',
  operatingSystem: 'Web, iOS, Android',
  description:
    'Перша в Україні відеоCRM для автосервісу з мобільним додатком для механіка та власника авто.',
  offers: { '@type': 'Offer', priceCurrency: 'UAH' },
  publisher: { '@type': 'Organization', name: 'MECHORBIT OÜ', url: 'https://mechorbit.com' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='uk' dir='ltr'>
      <body suppressHydrationWarning>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        {children}
        <Script
          src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBwayAIVduY2IXuAPcUyJ9-H8h-is8BWbE&libraries=places'
          strategy='beforeInteractive'
        />
      </body>
    </html>
  );
}
