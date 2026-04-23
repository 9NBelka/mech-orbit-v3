'use client';

import { useState, useEffect } from 'react';
import Header from '../Header/Header';

interface NavLink {
  title: string;
  linkToPage: string;
}

interface MechOrbitClientProps {
  lang: string;
  onFooterAndHeaderTextLinksMain: NavLink[];
  loginButtonText: string;
}

export default function MechOrbitClient({ lang, onFooterAndHeaderTextLinksMain, loginButtonText }: MechOrbitClientProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Header
      isScrolled={isScrolled}
      scrollToSection={scrollToSection}
      onFooterAndHeaderTextLinksMain={onFooterAndHeaderTextLinksMain}
      currentLang={lang}
      loginButtonText={loginButtonText}
    />
  );
}