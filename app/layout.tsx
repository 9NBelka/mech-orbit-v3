import type { Metadata } from 'next';
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
  return children;
}