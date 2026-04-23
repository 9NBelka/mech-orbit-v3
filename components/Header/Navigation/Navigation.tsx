'use client';

import clsx from 'clsx';
import Link from 'next/link';
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
  return (
    <nav className={clsx(styles.nav, tablet && styles.navMobile)}>
      {onFooterAndHeaderTextLinksMain.map((info, index) => (
        <a
          key={index}
          onClick={() => handleScroll(info.linkToPage)}
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