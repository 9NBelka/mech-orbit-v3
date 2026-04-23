import styles from './AboutUs.module.scss';
import clsx from 'clsx';
import { LuFactory } from 'react-icons/lu';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { GoDotFill } from 'react-icons/go';
import { CgFileDocument } from 'react-icons/cg';
import { BsArrowRightShort } from 'react-icons/bs';
import LangLink from '@/components/LangLink/LangLink';

interface Card {
  title: string;
  description: string;
}

interface AboutUsProps {
  tag: string;
  title: string;
  description: string;
  connectButton: string;
  learnMoreButton: string;
  cards: Card[];
}

export default function AboutUsScreen({
  tag,
  title,
  description,
  connectButton,
  learnMoreButton,
  cards,
}: AboutUsProps) {
  return (
    <section className={styles.aboutUs} id='product'>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <div className={styles.tagBlock}>
            <GoDotFill className={styles.badgeIndicator} />
            <p>{tag}</p>
          </div>

          <h3 className={styles.titleScreen}>
            <span>CRMmech</span> — {title}
          </h3>

          <div className={styles.borderLine}></div>

          <p className={styles.textDescription}>{description}</p>

          <div className={styles.imageAndIconBlocks}>
            <div className={styles.blockImageDashboard}>
              <img
                src='/images/mech-orbit-screen-dashboard.webp'
                alt='mech-orbit-screen-dashboard'
              />
            </div>
            <div className={styles.iconsBlocks}>
              {cards.map((card, index) => (
                <div key={index} className={styles.card}>
                  <div
                    className={clsx(
                      styles.iconContainer,
                      index === 1 && styles.iconContainerPurple,
                      index === 2 && styles.iconContainerLightBlue,
                    )}>
                    <span className={clsx(
                      styles.cardIcon,
                      index === 1 && styles.colorPurple,
                      index === 2 && styles.colorLightBlue,
                    )}>
                      {index === 0 && <CgFileDocument className={clsx(styles.cardIcon)} />}
                      {index === 1 && <FaArrowTrendUp className={clsx(styles.cardIcon, styles.colorPurple)} />}
                      {index === 2 && <LuFactory className={clsx(styles.cardIcon, styles.colorLightBlue)} />}
                    </span>
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
            <LangLink to='/register' className={styles.button}>
              {connectButton}
            </LangLink>

            <a href='https://crmmech.com' target='_blank'>
              <button className={clsx(styles.button, styles.buttonTwo)}>
                {learnMoreButton}
                <BsArrowRightShort className={styles.buttonIconTwo} />
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className={clsx(styles.neonCircle, styles.bluePrint)}></div>
    </section>
  );
}