import styles from './ForWhoScreen.module.scss';
import clsx from 'clsx';
import { LuDatabase } from 'react-icons/lu';
import { GoGraph } from 'react-icons/go';
import { BsShopWindow } from 'react-icons/bs';
import IntegrationsBlock from './IntegrationsBlock/IntegrationsBlock';

interface Card {
  title: string;
  description: string;
  classForColor: string;
}

interface ForWhoScreenProps {
  tag: string;
  headlineSpan: string;
  headline: string;
  description: string;
  cards: Card[];
  integrations: {
    title: string;
    description: string;
    cards: any[];
  };
}

const icons = [
  <LuDatabase className={clsx(styles.cardIcon, styles.colorPurple)} />,
  <GoGraph className={clsx(styles.cardIcon, styles.colorBlue)} />,
  <BsShopWindow className={clsx(styles.cardIcon, styles.colorOrange)} />,
];

export default function ForWhoScreen({
  tag, headlineSpan, headline, description, cards, integrations,
}: ForWhoScreenProps) {
  return (
    <section className={styles.forWho} id='integrations'>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <div className={styles.tagBlock}>
            <p>{tag}</p>
          </div>
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
            </div>
          ))}
        </div>

        <IntegrationsBlock
          title={integrations.title}
          description={integrations.description}
          cards={integrations.cards}
        />
      </div>
    </section>
  );
}