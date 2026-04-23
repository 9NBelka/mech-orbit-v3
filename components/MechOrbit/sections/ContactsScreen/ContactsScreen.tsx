import { BsEnvelope, BsTelegram, BsTelephoneForward } from 'react-icons/bs';
import styles from './ContactsScreen.module.scss';
import { FiArrowUpRight } from 'react-icons/fi';
import clsx from 'clsx';
import Image from 'next/image';

interface ContactsScreenProps {
  t: {
    title: string;
    titleSpan: string;
    titleEnd: string;
    description: string;
    writeUs: string;
    callUs: string;
    submitBtn: string;
  };
}

export default function ContactsScreen({ t }: ContactsScreenProps) {
  return (
    <section className={styles.contactsMain} id='contacts'>
      <h3 className={styles.textBackground}>CONTACT</h3>
      <div className={styles.container}>
        <div className={styles.contactsAndFormBlock}>
          <div className={styles.textContent}>
            <h3 className={styles.titleScreen}>
              {t.title} <span>{t.titleSpan}</span> {t.titleEnd}
            </h3>
            <p className={styles.textDescription}>{t.description}</p>

            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <div className={styles.iconAndContacts}>
                  <div className={styles.contactIconBlock}>
                    <BsEnvelope className={styles.contactIcon} />
                  </div>
                  <div>
                    <p className={styles.contactItemTitleMini}>{t.writeUs}</p>
                    <a href='mailto:forbludov@gmail.com' className={styles.contactLink} target='_blank'>
                      <p className={styles.contactItemTextMini}>forbludov@gmail.com</p>
                    </a>
                  </div>
                </div>
                <a href='mailto:forbludov@gmail.com' className={styles.contactLink} target='_blank'>
                  <div className={styles.iconRightLinkBlock}>
                    <FiArrowUpRight className={styles.iconRightLink} />
                  </div>
                </a>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.iconAndContacts}>
                  <div className={styles.contactIconBlock}>
                    <BsTelephoneForward className={styles.contactIcon} />
                  </div>
                  <div>
                    <p className={styles.contactItemTitleMini}>{t.callUs}</p>
                    <a href='https://wa.me/380685504202' target='_blank'>
                      <p className={styles.contactItemTextMini}>+380 (68) 550 42 02</p>
                    </a>
                  </div>
                </div>
                <a href='https://wa.me/380685504202' target='_blank'>
                  <div className={styles.iconRightLinkBlock}>
                    <FiArrowUpRight className={styles.iconRightLink} />
                  </div>
                </a>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.iconAndContacts}>
                  <div className={styles.contactIconBlock}>
                    <BsTelegram className={styles.contactIcon} />
                  </div>
                  <div>
                    <p className={styles.contactItemTitleMini}>Telegram</p>
                    <a href='https://t.me/mechorbit' target='_blank'>
                      <p className={styles.contactItemTextMini}>@mechorbit</p>
                    </a>
                  </div>
                </div>
                <a href='https://t.me/mechorbit' target='_blank'>
                  <div className={styles.iconRightLinkBlock}>
                    <FiArrowUpRight className={styles.iconRightLink} />
                  </div>
                </a>
              </div>

              <a
                href='https://docs.google.com/forms/d/e/1FAIpQLScF7Bg7K9h0wBgkuPckEoFz3r8Aj-ABnts30KvyucOxbDmYWw/viewform'
                target='_blank'
                className={styles.submitBtn}>
                <Image src='/sendIcon.svg' alt='' width={20} height={20} className={styles.planeIcon} />
                {t.submitBtn}
              </a>
            </div>
          </div>
          {/* <ContactForm t={t.form} /> */}
        </div>
      </div>
      <div className={clsx(styles.neonCircle, styles.bluePrint)}></div>
    </section>
  );
}