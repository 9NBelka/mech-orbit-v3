'use client';

import styles from '../Footer.module.scss';

interface FooterNavLinkProps {
  title: string;
  linkToPage: string;
}

export default function FooterNavLink({ title, linkToPage }: FooterNavLinkProps) {
  return (
    <a
      onClick={() => document.getElementById(linkToPage)?.scrollIntoView({ behavior: 'smooth' })}
      className={styles.navigationLinks}
      style={{ cursor: 'pointer' }}>
      {title}
    </a>
  );
}
