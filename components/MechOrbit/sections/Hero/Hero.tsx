import styles from './Hero.module.scss';
import { GoDotFill } from 'react-icons/go';
import { IoMdCheckmark } from 'react-icons/io';
import clsx from 'clsx';
import LangLink from '@/components/LangLink/LangLink';

interface HeroList {
  titleBold: string;
  title: string;
}

interface HeroProps {
  badge: string;
  headline: string;
  headlineTwo: string;
  descriptionTitle: string;
  subDescription: string;
  button: string;
  list: HeroList[];
}

export default function Hero({
  badge,
  headline,
  headlineTwo,
  descriptionTitle,
  subDescription,
  button,
  list,
}: HeroProps) {
  return (
    <section className={styles.hero} id='hero'>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <div className={styles.badge}>
            <GoDotFill className={styles.badgeIndicator} />
            <p>{badge}</p>
          </div>

          <h1 className={styles.headline}>
            <span className={styles.gradientText}>{headline}</span>
          </h1>

          <p className={clsx(styles.headline, styles.headlineTwo)}>{headlineTwo}</p>

          <div className={styles.descriptionBlock}>
            <p className={styles.descriptionTitle}>{descriptionTitle}</p>

            {list.map((item, index) => (
              <div key={index} className={styles.descriptionAndIconBlock}>
                <IoMdCheckmark className={styles.checkmarkIcon} />
                <p className={styles.description}>
                  <span>{item.titleBold}</span> — {item.title}
                </p>
              </div>
            ))}
          </div>

          <div className={styles.buttons}>
            <LangLink to='/register'>
              <button className={styles.button}>{button}</button>
            </LangLink>
          </div>

          <div className={styles.note}>
            <p className={styles.subDescription}>{subDescription}</p>
          </div>
        </div>

        <div className={styles.visualContent}>
          <img
            src='/images/mech-orbitHeroImage.webp'
            className={styles.backgroundImage}
            alt='orbitHeroImage'
          />
        </div>
      </div>

      <div className={clsx(styles.neonCircle, styles.bluePrint)}></div>
      <div className={clsx(styles.neonCircle, styles.pinkPrint)}></div>
    </section>
  );
}