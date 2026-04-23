import { use } from 'react';

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = use(params);

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}