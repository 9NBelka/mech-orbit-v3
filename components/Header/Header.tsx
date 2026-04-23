'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './Header.module.scss';
import { FiMenu, FiX } from 'react-icons/fi';
import Navigation from './Navigation/Navigation';
import LangSwitcher from '../LangSwitcher/LangSwitcher';

interface NavLink {
  title: string;
  linkToPage: string;
}

interface HeaderProps {
  isScrolled: boolean;
  scrollToSection: (section: string) => void;
  onFooterAndHeaderTextLinksMain: NavLink[];
  currentLang: string;
  loginButtonText: string;
}

export default function Header({
  isScrolled,
  scrollToSection,
  onFooterAndHeaderTextLinksMain,
  currentLang,
  loginButtonText
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleScroll = (section: string) => {
    scrollToSection(section);
    setMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logoBlock}>
          <div className={styles.logoContainer}>
            <img
              src='/mech-orbitLogo.svg'
              alt='Logo'
              className={styles.iconLogo}
            />
          </div>
        </div>

        <Navigation
          handleScroll={handleScroll}
          onFooterAndHeaderTextLinksMain={onFooterAndHeaderTextLinksMain}
          currentLang={currentLang}
          loginButtonText={loginButtonText}
        />

        <div className={styles.langSwitcherPhoneAndBurgerButton}>
          <div className={styles.langSwitcherPhone}>
            <LangSwitcher currentLang={currentLang} />
          </div>

          <button className={styles.burger} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen
              ? <FiX className={styles.burgerIcon} />
              : <FiMenu className={styles.burgerIcon} />
            }
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div className={`${styles.mobileWrapper} ${menuOpen ? styles.open : ''}`}>
        <div className={styles.mobileMenu} ref={menuRef}>
          <Navigation
            handleScroll={handleScroll}
            tablet={true}
            onFooterAndHeaderTextLinksMain={onFooterAndHeaderTextLinksMain}
            currentLang={currentLang}
            langSwitcher={true}
            loginButtonText={loginButtonText}
          />
        </div>
      </div>
    </header>
  );
}