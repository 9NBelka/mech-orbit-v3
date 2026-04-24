'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
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

export default function MechOrbitClient({
  lang,
  onFooterAndHeaderTextLinksMain,
  loginButtonText,
}: MechOrbitClientProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const hash = window.location.hash?.split('#').filter(Boolean)[0];
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
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
