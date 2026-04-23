'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

interface LangLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
}

export default function LangLink({ to, children, className, target }: LangLinkProps) {
  const params = useParams();
  const lang = (params?.lang as string) || 'ua';

  // Если путь уже содержит язык — не трогаем
  if (['ua', 'ru', 'en'].some((l) => to.startsWith(`/${l}`))) {
    return <Link href={to} className={className} target={target}>{children}</Link>;
  }

  const prefixedTo = `/${lang}${to.startsWith('/') ? to : '/' + to}`;

  return <Link href={prefixedTo} className={className} target={target}>{children}</Link>;
}