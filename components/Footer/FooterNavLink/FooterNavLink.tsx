'use client';

import { usePathname, useRouter } from 'next/navigation';
import styles from '../Footer.module.scss';

interface FooterNavLinkProps {
  title: string;
  linkToPage: string;
  lang: string;
}

export default function FooterNavLink({ title, linkToPage, lang }: FooterNavLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isHomePage = pathname === `/${lang}` || pathname === `/${lang}/`;

  const handleClick = () => {
    if (linkToPage === 'blog') {
      router.push(`/${lang}/blog`);
      return;
    }

    if (isHomePage) {
      document.getElementById(linkToPage)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      sessionStorage.setItem('scrollTo', linkToPage);
      router.push(`/${lang}`);
    }
  };

  return (
    <a onClick={handleClick} className={styles.navigationLinks} style={{ cursor: 'pointer' }}>
      {title}
    </a>
  );
}
