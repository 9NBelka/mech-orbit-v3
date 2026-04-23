import styles from './AboutUsScreenVinApp.module.scss';
import clsx from 'clsx';
import { LuBox, LuCamera, LuClipboardList, LuWrench } from 'react-icons/lu';
import { BsArrowRightShort } from 'react-icons/bs';
import Link from 'next/link';

interface Card {
  title: string;
  description: string;
}

interface AboutUsScreenVinAppProps {
  title: string;
  description: string;
  learnMoreButton: string;
  cards: Card[];
}

export default function AboutUsScreenVinApp({
  title,
  description,
  learnMoreButton,
  cards,
}: AboutUsScreenVinAppProps) {
  return (
    <section className={styles.aboutUs} id='vinapp'>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <h3 className={styles.titleScreen}>
            <span>{title}</span>
          </h3>

          <div className={styles.borderLine}></div>

          <p className={styles.textDescription}>{description}</p>

          <div className={styles.imageAndIconBlocks}>
            <div className={styles.iconsBlocks}>
              {cards.map((card, index) => (
                <div key={index} className={styles.card}>
                  <div className={clsx(
                    styles.iconContainer,
                    index === 1 && styles.iconContainerLightBlue,
                    index === 2 && styles.iconContainerGreen,
                    index === 3 && styles.iconContainerPurple,
                  )}>
                    {index === 0 && <LuCamera className={styles.cardIcon} />}
                    {index === 1 && <LuWrench className={clsx(styles.cardIcon, styles.colorLightBlue)} />}
                    {index === 2 && <LuClipboardList className={clsx(styles.cardIcon, styles.colorGreen)} />}
                    {index === 3 && <LuBox className={clsx(styles.cardIcon, styles.colorPurple)} />}
                  </div>
                  <div className={styles.cardTitleAndDescription}>
                    <h4 className={styles.cardTitle}>{card.title}</h4>
                    <p className={styles.cardDescription}>{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.blockImageDashboard}>
              <img
                src='/images/mech-orbit-screen-vin-app-phone.jpg'
                alt='mech-orbit-screen-vin-app-phone'
              />
            </div>
          </div>

          <div className={styles.buttons}>
            <Link href='https://mech.vin' target='_blank' className={styles.button}>
              {learnMoreButton} <BsArrowRightShort className={styles.buttonIconTwo} />
            </Link>
          </div>
        </div>
      </div>
      <div className={clsx(styles.neonCircle, styles.bluePrint)}></div>
    </section>
  );
}