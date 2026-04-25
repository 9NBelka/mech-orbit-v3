import clsx from 'clsx';
import styles from './HowToStart.module.scss';
import { FaArrowAltCircleRight } from 'react-icons/fa';

interface Card {
  title: string;
  description: string;
  classForColor: string;
  classForColorText: string;
}

interface HowToStartProps {
  title: string;
  demoButton: string;
  cards: Card[];
}

export default function HowToStart({ title, demoButton, cards }: HowToStartProps) {
  return (
    <section className={styles.howToStartMain} id='howToStart'>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <h3 className={styles.titleScreen}>{title}</h3>
          <div className={styles.borderLine}></div>
        </div>

        <div className={styles.cardsInfo}>
          {cards.map((info, index) => (
            <div key={index} style={{ display: 'contents' }}>
              <div className={clsx(styles.cardInfo, styles[info.classForColor])}>
                <div className={styles.iconAndTitleBlock}>
                  <div className={clsx(styles.iconCardBlock, styles[info.classForColor])}>
                    <p className={clsx(styles.cardTextIcon, styles[info.classForColorText])}>
                      {index + 1}
                    </p>
                  </div>
                  <h3 className={styles.cardInfoTitle}>{info.title}</h3>
                </div>
                {index !== 0 ? (
                  <p className={styles.cardDescription}>{info.description}</p>
                ) : (
                  <a href='#contacts' className={styles.buttonDemoLink}>
                    {demoButton}
                  </a>
                )}
              </div>
              {index <= 2 && (
                <div className={styles.iconAlign}>
                  <FaArrowAltCircleRight className={styles.iconArrow} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
