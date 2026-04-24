'use client';

import styles from '../Footer.module.scss';

interface FooterScrollButtonProps {
  label: string;
  targetSection: string;
}

export default function FooterScrollButton({ label, targetSection }: FooterScrollButtonProps) {
  return (
    <a
      className={styles.button}
      onClick={() => document.getElementById(targetSection)?.scrollIntoView({ behavior: 'smooth' })}
      style={{ cursor: 'pointer' }}>
      {label}
    </a>
  );
}
