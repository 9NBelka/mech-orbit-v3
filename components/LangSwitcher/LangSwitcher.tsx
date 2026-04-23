'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { useRouter, usePathname } from 'next/navigation';
import styles from './LangSwitcher.module.scss';

const languages = [
  { code: 'ua', label: 'Українська', short: 'UA' },
  { code: 'ru', label: 'Русский', short: 'RU' },
  { code: 'en', label: 'English', short: 'EN' },
];

export default function LangSwitcher({
  currentLang,
  langSwitcher,
}: {
  currentLang: string;
  langSwitcher?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const current = languages.find((l) => l.code === currentLang) || languages[0];

  const changeLanguage = (langCode: string) => {
    // Заменяем /ua|ru|en в начале пути
    const newPath = pathname.replace(/^\/(ua|ru|en)\b/, '') || '/';
    router.push(`/${langCode}${newPath === '/' ? '' : newPath}`);
    setIsOpen(false);
  };

  return (
    <div
      className={clsx(styles.langSwitcher, langSwitcher && styles.langSwitcherPhone)}
      onMouseLeave={() => setIsOpen(false)}>
      <button
        className={clsx(styles.langCurrent, isOpen && styles.active)}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-haspopup='true'>
        <span className={styles.currentShort}>{current.short}</span>
        <span className={clsx(styles.arrow, isOpen && styles.arrowUp)}>▼</span>
      </button>

      {isOpen && (
        <ul className={styles.langDropdown}>
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                className={clsx(styles.langItem, lang.code === currentLang && styles.selected)}
                onClick={() => changeLanguage(lang.code)}>
                <span className={styles.langShort}>{lang.short}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}