import styles from './IntegrationsBlock.module.scss';
import clsx from 'clsx';
import { GoDotFill } from 'react-icons/go';
import { BsArrowRightShort } from 'react-icons/bs';

interface PointList {
  pointTitle: string;
  pointDescription: string;
  pointStatus: string;
  pointStatusClass?: string;
}

interface IntegrationCard {
  title: string;
  mainStatus: string;
  tags: string[];
  buttonText?: string;
  linkToButton?: string;
  list: PointList[];
}

interface IntegrationsBlockProps {
  title: string;
  description: string;
  cards: IntegrationCard[];
}

export default function IntegrationsBlock({ title, description, cards }: IntegrationsBlockProps) {
  return (
    <div className={styles.textContentForTwoBlock}>
      <h3 className={styles.textContentForTwoBlockTitle}>{title}</h3>
      <p className={styles.textContentForTwoBlockDescription}>{description}</p>

      <div className={styles.cards}>
        {cards.map((info, index) => (
          <div key={index} className={styles.card}>
            <div>
              <div className={styles.headerCard}>
                <h4 className={styles.title}>{info.title}</h4>
                <div className={styles.mainStatusBlock}>
                  <GoDotFill className={styles.badgeIndicator} />
                  <p className={styles.mainStatus}>{info.mainStatus}</p>
                </div>
              </div>
              <div className={styles.listBlock}>
                {info.list.map((textList, i) => (
                  <div key={i} className={styles.pointListBlock}>
                    <div className={styles.pointListTextBlock}>
                      <h5 className={styles.titleList}>{textList.pointTitle}</h5>
                      <p className={styles.descriptionList}>{textList.pointDescription}</p>
                    </div>
                    <div className={clsx(styles.pointListStatusBlock, styles[textList.pointStatusClass || ''])}>
                      <GoDotFill className={styles.pointListBadgeIndicator} />
                      <p className={styles.pointListMainStatus}>{textList.pointStatus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.tagsAndButton}>
              <div className={styles.tagBlocks}>
                {info.tags.map((tag, i) => (
                  <div key={i} className={styles.tagBlock}>
                    <p className={styles.tagText}>{tag}</p>
                    {i <= 1 && <GoDotFill className={styles.tagBadgeIndicator} />}
                  </div>
                ))}
              </div>
              {info.buttonText && (
                <a href={info.linkToButton} className={styles.button} target='_blank'>
                  {info.buttonText}
                  <BsArrowRightShort className={styles.buttonIcon} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}