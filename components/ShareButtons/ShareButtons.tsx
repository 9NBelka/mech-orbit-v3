'use client';

import { useEffect, useState } from 'react';
import styles from './ShareButtons.module.scss';
import { BsTelegram, BsTwitterX, BsFacebook, BsLink45Deg, BsWhatsapp } from 'react-icons/bs';

const ui = {
  ua: { share: 'Поділитися:', copied: 'Скопійовано!' },
  ru: { share: 'Поделиться:', copied: 'Скопировано!' },
  en: { share: 'Share:', copied: 'Copied!' },
};

type Lang = 'ua' | 'ru' | 'en';

interface ShareButtonsProps {
  title: string;
  lang: string;
}

export default function ShareButtons({ title, lang }: ShareButtonsProps) {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const t = ui[lang as Lang] || ui.en;

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const links = [
    {
      icon: <BsTelegram className={styles.icon} />,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      label: 'Telegram',
      className: styles.telegram,
    },
    {
      icon: <BsWhatsapp className={styles.icon} />,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      label: 'WhatsApp',
      className: styles.whatsapp,
    },
    {
      icon: <BsFacebook className={styles.icon} />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      label: 'Facebook',
      className: styles.facebook,
    },
    {
      icon: <BsTwitterX className={styles.icon} />,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      label: 'X',
      className: styles.twitter,
    },
  ];

  return (
    <div className={styles.shareBlock}>
      <p className={styles.shareLabel}>{t.share}</p>
      <div className={styles.buttons}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target='_blank'
            rel='noopener noreferrer'
            className={`${styles.button} ${link.className}`}
            aria-label={link.label}>
            {link.icon}
          </a>
        ))}
        <button
          onClick={handleCopy}
          className={`${styles.button} ${styles.copy} ${copied ? styles.copied : ''}`}
          aria-label='Copy link'>
          <BsLink45Deg className={styles.icon} />
          {copied && <span className={styles.copiedText}>{t.copied}</span>}
        </button>
      </div>
    </div>
  );
}
