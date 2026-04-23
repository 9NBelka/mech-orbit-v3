'use client';

import styles from './ConsultationButton.module.scss';
import { BsArrowRightShort } from 'react-icons/bs';

interface ConsultationButtonProps {
  label: string;
  targetSection: string;
}

export default function ConsultationButton({ label, targetSection }: ConsultationButtonProps) {
  const handleClick = () => {
    document.getElementById(targetSection)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <a className={styles.buttonTest} onClick={handleClick} style={{ cursor: 'pointer' }}>
      {label} <BsArrowRightShort className={styles.buttonIcon} />
    </a>
  );
}