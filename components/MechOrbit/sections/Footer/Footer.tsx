'use client';

import styles from './Footer.module.scss';
import { BsEnvelope, BsFacebook, BsGeoAlt, BsInstagram, BsTelegram, BsTelephone } from 'react-icons/bs';
import LangLink from '@/components/LangLink/LangLink';

interface NavLink {
  title: string;
  linkToPage: string;
}

interface FooterProps {
  onFooterAndHeaderTextLinksMain: NavLink[];
  t: {
    description: string;
    demoButton: string;
    navigation: string;
    contacts: string;
    socialNetworks: string;
    copyright: string;
    location: string;
    links: {
      suppliers: string;
      resellers: string;
      integrators: string;
      franchisees: string;
      forInvestors: string;
      forServices: string;
    };
    legal: {
      privacy: string;
      terms: string;
      offer: string;
    };
  };
}

export default function Footer({ onFooterAndHeaderTextLinksMain, t }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.borderLine}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brandSection}>
            <div className={styles.logoAndAnotherTextBlock}>
              <div className={styles.logo}>MECHORBIT</div>
              <p className={styles.slogan}>#Taking back control</p>
              <p className={styles.description}>{t.description}</p>
            </div>
            <a className={styles.button} onClick={() => scrollToSection('tryToStart')} style={{ cursor: 'pointer' }}>
              {t.demoButton}
            </a>
          </div>

          <div className={styles.linksAndServicesBlock}>
            <div className={styles.linksSection}>
              <h4>{t.navigation}</h4>
              <ul>
                {onFooterAndHeaderTextLinksMain.map((info, idx) => (
                  <li key={idx}>
                    <a onClick={() => scrollToSection(info.linkToPage)} className={styles.navigationLinks} style={{ cursor: 'pointer' }}>
                      {info.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.servicesSection}>
              <h4>MECH Orbit</h4>
              <ul>
                <li><a href='https://crmmech.com' target='_blank'>CRMmech</a></li>
                <li><a href='https://mech.vin/ua' target='_blank'>MechVin</a></li>
                <li><a href='https://book.vin/ua' target='_blank'>BookVin</a></li>
              </ul>
            </div>

            <div className={styles.servicesSection}>
              <h4>MECH Partners</h4>
              <ul>
                <li><a href='https://mech.partners/ua' target='_blank'>{t.links.suppliers}</a></li>
                <li><a href='#' className={styles.linkOff}>{t.links.resellers}</a></li>
                <li><a href='#' className={styles.linkOff}>{t.links.integrators}</a></li>
                <li><a href='#' className={styles.linkOff}>{t.links.franchisees}</a></li>
              </ul>
            </div>

            <div className={styles.servicesSection}>
              <h4>MECH Capital</h4>
              <ul>
                <li><a href='https://mech.capital' target='_blank'>{t.links.forInvestors}</a></li>
                <li><a href='#' className={styles.linkOff}>{t.links.forServices}</a></li>
              </ul>
            </div>

            <div className={styles.contactSection}>
              <h4>{t.contacts}</h4>
              <div className={styles.contactList}>
                <a href='mailto:forbludov@gmail.com' className={styles.contactLink} target='_blank'>
                  <BsEnvelope className={styles.footerContactIcon} />
                  forbludov@gmail.com
                </a>
                <a href='https://wa.me/380685504202' className={styles.contactLink} target='_blank'>
                  <BsTelephone className={styles.footerContactIcon} />
                  +380 (68) 550 42 02
                </a>
                <a className={styles.contactLink}>
                  <BsGeoAlt className={styles.footerContactIcon} />
                  {t.location}
                </a>
              </div>
              <div className={styles.social}>
                <h5>{t.socialNetworks}</h5>
                <div className={styles.socialLinks}>
                  <a href='#' aria-label='Facebook' target='_blank'>
                    <BsFacebook className={styles.footerSocialIcon} />
                  </a>
                  <a href='#' aria-label='Telegram' target='_blank'>
                    <BsTelegram className={styles.footerSocialIcon} />
                  </a>
                  <a href='#' aria-label='Instagram' target='_blank'>
                    <BsInstagram className={styles.footerSocialIcon} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copyright}>
            <p>&copy; {currentYear} MECHORBIT. {t.copyright}</p>
          </div>
          <div className={styles.socialsTags}>
            <a>Socials: @mechorbit • @mech_orbit • @mechorbit_ai</a>
          </div>
        </div>

        <div className={styles.legal}>
          <LangLink to='/privacy-policy' target='_blank'>{t.legal.privacy}</LangLink>
          <LangLink to='/terms-of-use' target='_blank'>{t.legal.terms}</LangLink>
          <LangLink to='/public-offer' target='_blank'>{t.legal.offer}</LangLink>
        </div>
      </div>
    </footer>
  );
}