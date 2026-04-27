import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.scss';

export const metadata: Metadata = {
  title: 'CRM для Автосервіса з AI-контролем | MECH Orbit',
  description:
    'MECH Orbit — це автоматизація для СТО з CRM відеоаналітикою та ШІ. Автоматизуйте контроль простоїв, керуйте запчастинами та підвищуйте прибуток. Безкоштовний тест 14 днів.',
  keywords: ['mech', 'orbit', 'CRM', 'автосервіс', 'СТО', 'відеоаналітика'],
  authors: [{ name: 'mech.orbit' }],
  robots: { index: true, follow: true },
  verification: { google: '-kUrdMNH0_rdY0cg1-d_KHZfPEquiVpoJW-1EpIqQhE' },

  openGraph: {
    title: 'CRM для Автосервіса з AI-контролем | MECH Orbit',
    description:
      'MECH Orbit — це автоматизація для СТО з CRM відеоаналітикою та ШІ. Автоматизуйте контроль простоїв, керуйте запчастинами та підвищуйте прибуток. Безкоштовний тест 14 днів.',
    type: 'website',
    url: 'https://mechorbit.com',
    siteName: 'MECH Orbit — Операційна система для автосервісів',
    images: [{ url: 'https://mechorbit.com/mechMetalLogo.jpg' }],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'CRM для Автосервіса з AI-контролем | MECH Orbit',
    description:
      'MECH Orbit — це автоматизація для СТО з CRM відеоаналітикою та ШІ. Безкоштовний тест 14 днів.',
    site: '@mech_orbit',
    images: ['https://mechorbit.com/mechMetalLogo.jpg'],
  },

  alternates: {
    canonical: 'https://mechorbit.com/ua',
    languages: {
      uk: 'https://mechorbit.com/ua',
      ru: 'https://mechorbit.com/ru',
      en: 'https://mechorbit.com/en',
      'x-default': 'https://mechorbit.com/ua',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='uk' dir='ltr'>
      <body suppressHydrationWarning>
        {children}
        <Script
          src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBwayAIVduY2IXuAPcUyJ9-H8h-is8BWbE&libraries=places'
          strategy='beforeInteractive'
        />
      </body>
    </html>
  );
}
