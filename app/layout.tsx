import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.scss';

export const metadata: Metadata = {
  title: 'MechOrbit',
  description: 'CRM для автосервісів',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        {children}
        <Script
          src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBwayAIVduY2IXuAPcUyJ9-H8h-is8BWbE&libraries=places'
          strategy='beforeInteractive'
        />
      </body>
    </html>
  );
}
