import { use } from 'react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    alternates: {
      canonical: `https://mechorbit.com/${lang}`,
      languages: {
        uk: 'https://mechorbit.com/ua',
        ru: 'https://mechorbit.com/ru',
        en: 'https://mechorbit.com/en',
        'x-default': 'https://mechorbit.com/ua',
      },
    },
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = use(params);
  return <div lang={lang}>{children}</div>;
}
