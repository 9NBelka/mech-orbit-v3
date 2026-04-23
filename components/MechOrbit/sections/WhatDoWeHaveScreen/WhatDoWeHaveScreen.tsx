import styles from './WhatDoWeHaveScreen.module.scss';
import clsx from 'clsx';
import { LuBrain, LuLink } from 'react-icons/lu';
import { GoPulse } from 'react-icons/go';
import { BsPhone } from 'react-icons/bs';
import { RxLightningBolt } from 'react-icons/rx';
import { BiBullseye } from 'react-icons/bi';
import TextAndListBlock from './TextAndListBlock/TextAndListBlock';


interface Card {
  title: string;
  description: string;
  classForColor: string;
  tagCardText: string;
}

interface WhatDoWeHaveScreenProps {
  headlineSpan: string;
  headline: string;
  description: string;
  cards: Card[];
  textAndList: {
    title: string;
    description: string;
    list: string[];
    conclusionText: string;
    conclusionSpan: string;
    bottomText: string;
  };
}

const icons = [
  <LuBrain className={clsx(styles.cardIcon, styles.colorPink)} />,
  // <BsDiagram2 className={clsx(styles.cardIcon, styles.colorLightOrange)} />,
  // <BsBoxSeam className={clsx(styles.cardIcon, styles.colorLightBlue)} />,
  <BiBullseye className={clsx(styles.cardIcon, styles.colorYellow)} />,
  <BsPhone className={clsx(styles.cardIcon, styles.colorBlue)} />,
  <GoPulse className={clsx(styles.cardIcon, styles.colorOrange)} />,
  <LuLink className={clsx(styles.cardIcon, styles.colorPurple)} />,
  <RxLightningBolt className={clsx(styles.cardIcon, styles.colorGreen)} />,
  // <PiGlobeSimple className={clsx(styles.cardIcon, styles.colorBrown)} />,
];

export default function WhatDoWeHaveScreen({
  headlineSpan,
  headline,
  description,
  cards,
  textAndList,
}: WhatDoWeHaveScreenProps) {
  return (
    <section className={styles.whatDoWeHave} id=''>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <h3 className={styles.titleScreen}>
            <span>{headlineSpan}</span> {headline}
          </h3>
          <div className={styles.borderLine}></div>
          <p className={styles.textDescription}>{description}</p>
        </div>

        <div className={styles.cardsInfo}>
          {cards.map((info, index) => (
            <div className={clsx(styles.cardInfo, styles[info.classForColor])} key={index}>
              <div className={styles.iconAndTitleBlock}>
                <div className={clsx(styles.iconCardBlock, styles[info.classForColor])}>
                  {icons[index]}
                </div>
                <h3 className={styles.cardInfoTitle}>{info.title}</h3>
              </div>
              <p className={styles.cardDescription}>{info.description}</p>
              {/* <div className={styles.buttonLinkBlock}>
                <a href='#' className={styles.buttonLink}>
                  Узнать больше <BsArrowRightShort className={styles.buttonIcon} />
                </a>
              </div> */}
              <div className={styles.tagCard}>
                <p className={styles.tagCardText}>{info.tagCardText}</p>
              </div>
            </div>
          ))}
        </div>

        <TextAndListBlock {...textAndList} />
      </div>
      <div className={clsx(styles.neonCircle, styles.bluePrintTwo)}></div>
    </section>
  );
}