import styles from './AboutUsScreenBookvin.module.scss';
import clsx from 'clsx';
import { BsArrowRightShort, BsIntersect } from 'react-icons/bs';
import { RiAlertLine, RiWallet3Fill } from 'react-icons/ri';
import { TbSettingsFilled } from 'react-icons/tb';
import Link from 'next/link';

interface Card {
  title: string;
  description: string;
}

interface AboutUsScreenBookvinProps {
  title: string;
  description: string;
  learnMoreButton: string;
  cards: Card[];
}

export default function AboutUsScreenBookvin({
  title,
  description,
  learnMoreButton,
  cards,
}: AboutUsScreenBookvinProps) {
  return (
    <section className={styles.aboutUs} id='bookvin'>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <h3 className={styles.titleScreen}>
            <span>Bookvin</span> — {title}
          </h3>

          <div className={styles.borderLine}></div>

          <p className={styles.textDescription}>{description}</p>

          <div className={styles.imageAndIconBlocks}>
            <div className={styles.blockImageDashboard}>
              <img
                src='/images/mech-orbit-screen-bookvin-phone.jpg'
                alt='mech-orbit-screen-bookvin-phone'
              />
            </div>
            <div className={styles.iconsBlocks}>
              {cards.map((card, index) => (
                <div key={index} className={styles.card}>
                  <div className={clsx(
                    styles.iconContainer,
                    index === 1 && styles.iconContainerLightBlue,
                    index === 2 && styles.iconContainerGreen,
                    index === 3 && styles.iconContainerPurple,
                  )}>
                    {index === 0 && <BsIntersect className={styles.cardIcon} />}
                    {index === 1 && <TbSettingsFilled className={clsx(styles.cardIcon, styles.colorLightBlue)} />}
                    {index === 2 && <RiWallet3Fill className={clsx(styles.cardIcon, styles.colorGreen)} />}
                    {index === 3 && <RiAlertLine className={clsx(styles.cardIcon, styles.colorPurple)} />}
                  </div>
                  <div className={styles.cardTitleAndDescription}>
                    <h4 className={styles.cardTitle}>{card.title}</h4>
                    <p className={styles.cardDescription}>{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.buttons}>
            <Link href='https://book.vin/ua' target='_blank' className={styles.button}>
              {learnMoreButton} <BsArrowRightShort className={styles.buttonIconTwo} />
            </Link>
          </div>
        </div>
      </div>
      <div className={clsx(styles.neonCircle, styles.bluePrint)}></div>
    </section>
  );
}