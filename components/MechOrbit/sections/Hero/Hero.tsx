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
  headlineWhite: string;
  headlineTwo: string;
  headlineThree: string;
  descriptionTitle: string;
  subDescription: string;
  button: string;
  textBottomCar: string;
  textBottomCarTwo: string;
  list: HeroList[];
  lang: string;
}

export default function Hero({
  badge,
  headline,
  headlineWhite,
  headlineTwo,
  headlineThree,
  descriptionTitle,
  subDescription,
  button,
  textBottomCar,
  textBottomCarTwo,
  list,
  lang,
}: HeroProps) {
  console.log(lang);
  return (
    <section className={styles.hero} id='hero'>
      <div className={styles.heroDimmer} />
      <div className={styles.heroGradient} />
      <div className={styles.container}>
        <div className={styles.textContent}>
          <div className={styles.badge}>
            <GoDotFill className={styles.badgeIndicator} />
            <p>{badge}</p>
          </div>

          <h1 className={clsx(styles.headline, styles[`langTitle_${lang}`])}>
            <span className={styles.gradientText}>{headline}</span>
            <p>{headlineWhite}</p>
          </h1>

          <p className={clsx(styles.headline, styles.headlineTwo, styles[`lang_${lang}`])}>
            {headlineTwo} <span>{headlineThree}</span>
          </p>

          <div className={styles.descriptionBlock}>
            {/* <p className={styles.descriptionTitle}>{descriptionTitle}</p> */}

            {list.map((item, index) => (
              <div key={index} className={styles.descriptionAndIconBlock}>
                <IoMdCheckmark className={styles.checkmarkIcon} />
                <p className={styles.description}>
                  <span>{item.titleBold}</span> {item.title}
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

        <div className={styles.lineForFlyBlock}></div>

        <div className={styles.flyBlockWith}>
          <div className={clsx(styles.flyBlockBlockText, styles[`langflyBlock_${lang}`])}>
            <p>{textBottomCar}</p>
          </div>
        </div>

        <div className={clsx(styles.lineForFlyBlock, styles.lineForFlyBlockTwo)}></div>

        <div className={clsx(styles.flyBlockWith, styles.flyBlockWithTwo)}>
          <div className={clsx(styles.flyBlockBlockText, styles[`langflyBlock_${lang}`])}>
            <p>{textBottomCarTwo}</p>
          </div>
        </div>

        {/* <div className={styles.visualContent}>
          <img
            src='/images/mech-orbitHeroImage.webp'
            className={styles.backgroundImage}
            alt='orbitHeroImage'
          />
        </div> */}
      </div>

      <div className={clsx(styles.neonCircle, styles.bluePrint)}></div>
      <div className={clsx(styles.neonCircle, styles.pinkPrint)}></div>
    </section>
  );
}
