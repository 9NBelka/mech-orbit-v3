'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Navigation.module.scss';
import LangSwitcher from '../../LangSwitcher/LangSwitcher';

interface NavLink {
  title: string;
  linkToPage: string;
}

interface NavigationProps {
  handleScroll: (section: string) => void;
  tablet?: boolean;
  onFooterAndHeaderTextLinksMain: NavLink[];
  currentLang: string;
  langSwitcher?: boolean;
  loginButtonText: string;
}

export default function Navigation({
  handleScroll,
  tablet,
  onFooterAndHeaderTextLinksMain,
  currentLang,
  langSwitcher,
  loginButtonText,
}: NavigationProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Главная страница — /{lang} или /{lang}/
  const isHomePage = pathname.startsWith(`/${currentLang}`);

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // если элемента нет — переходим на главную и потом скроллим
    router.push(`/${currentLang}`);

    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <nav className={clsx(styles.nav, tablet && styles.navMobile)}>
      {onFooterAndHeaderTextLinksMain.map((info, index) => (
        <a
          key={index}
          onClick={() => handleNavClick(info.linkToPage)}
          className={styles.navLink}
          style={{ cursor: 'pointer' }}>
          {info.title}
        </a>
      ))}

      <LangSwitcher currentLang={currentLang} langSwitcher={langSwitcher} />

      <Link href={`/${currentLang}/register`} target='_blank' className={styles.buttonInvestLink}>
        <button className={styles.buttonInvest}>{loginButtonText}</button>
      </Link>
    </nav>
  );
}
