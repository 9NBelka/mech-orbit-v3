import styles from './WhyUsScreen.module.scss';
import clsx from 'clsx';
import { LuCircleCheckBig } from 'react-icons/lu';

interface WhyUsItem {
  title: string;
  description: string;
  classForColor: string;
}

interface WhyUsScreenProps {
  headline: string;
  headlineSpan: string;
  subTitle: string;
  description: string;
  conclusionSpan: string;
  conclusionText: string;
  items: WhyUsItem[];
}

export default function WhyUsScreen({
  headline,
  headlineSpan,
  subTitle,
  description,
  conclusionSpan,
  conclusionText,
  items,
}: WhyUsScreenProps) {
  return (
    <section className={styles.whyUs} id='solution'>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <h3 className={styles.titleScreen}>
            {headline}<span> {headlineSpan}</span>
          </h3>
          <div className={styles.borderLine}></div>
          <h5 className={styles.titleForDescription}>{subTitle}</h5>
          <p className={styles.textDescription}>{description}</p>
        </div>

        <div className={styles.cardsInfo}>
          {items.map((info, index) => (
            <div className={clsx(styles.cardInfo, styles[info.classForColor])} key={index}>
              <div className={styles.numberAndTitleBlock}>
                <div className={clsx(styles.numberCardBlock, styles[info.classForColor])}>
                  <h4 className={clsx(styles.numberCardText, styles[info.classForColor])}>
                    0{index + 1}
                  </h4>
                </div>
                <h3 className={styles.cardInfoTitle}>{info.title}</h3>
              </div>
              <p className={styles.cardDescription}>{info.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.blockBottomScreen}>
          <div className={styles.conclusionBlock}>
            <LuCircleCheckBig className={styles.iconCheck} />
            <h6 className={styles.conclusionText}>
              <span>{conclusionSpan}</span> {conclusionText}
            </h6>
          </div>
        </div>
      </div>

      <div className={clsx(styles.neonCircle, styles.bluePrint)}></div>
      <div className={clsx(styles.neonCircle, styles.bluePrintTwo)}></div>
    </section>
  );
}