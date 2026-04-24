'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NotFoundPage.module.scss';

const translations = {
  ua: { title: 'Сторінку не знайдено', subtitle: '404', buttonText: 'На головну' },
  ru: { title: 'Страница не найдена', subtitle: '404', buttonText: 'На главную' },
  en: { title: 'Page not found', subtitle: '404', buttonText: 'Back to home' },
};

type Lang = 'ua' | 'ru' | 'en';

export default function NotFound() {
  const pathname = usePathname();
  const lang = (pathname?.split('/')[1] as Lang) || 'ua';
  const t = translations[lang] || translations.en;

  return (
    <div className={styles.notFoundPage}>
      <h1>{t.subtitle}</h1>
      <h2>{t.title}</h2>
      <Link href={`/${lang}`} className={styles.buttonLink}>
        <p>{t.buttonText}</p>
      </Link>
    </div>
  );
}
