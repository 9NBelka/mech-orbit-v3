import { use } from 'react';
import MechOrbitClient from '@/components/MechOrbit/MechOrbitClient';
import Footer from '@/components/Footer/Footer';
import { getT } from '@/lib/i18n';

export default function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = use(params);
  const t = getT(lang);

  const navLinks = [
    { title: t.nav.product, linkToPage: 'product' },
    { title: t.nav.solutions, linkToPage: 'solution' },
    { title: t.nav.calculator, linkToPage: 'calculator' },
    { title: t.nav.integrations, linkToPage: 'integrations' },
    { title: t.nav.pricing, linkToPage: 'price' },
    { title: t.nav.contacts, linkToPage: 'contacts' },
  ];

  return (
    <>
      <MechOrbitClient
        lang={lang}
        onFooterAndHeaderTextLinksMain={navLinks}
        loginButtonText={t.header.loginButton}
      />
      {children}
      <Footer onFooterAndHeaderTextLinksMain={navLinks} lang={lang} t={t.footer} />
    </>
  );
}
