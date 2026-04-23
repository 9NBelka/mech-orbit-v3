'use client';

import clsx from 'clsx';
import styles from './TryToStartScreen.module.scss';
import { BsFillHouseFill, BsPersonFill, BsPuzzleFill } from 'react-icons/bs';
import { IoMdCheckmark } from 'react-icons/io';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import LangLink from '@/components/LangLink/LangLink';

interface TryToStartProps {
  isOn: boolean;
  getDisplayPrice: (price: number) => string;
  t: {
    title: string;
    titleSpan: string;
    titleEnd: string;
    description: string;
    daysLabel: string;
    comingSoon: string;
    mainStatus: string;
    infoList: string[];
    tryButton: string;
    loginButton: string;
    tariff: any;
  };
}

function getIcon(iconType: string | undefined, className: string) {
  if (iconType === 'puzzle') return <BsPuzzleFill className={className} />;
  return <BsPersonFill className={className} />;
}

export default function TryToStartScreen({ isOn, getDisplayPrice, t }: TryToStartProps) {
  const tariff = t.tariff;

  return (
    <section className={styles.tryToStartScreen} id='tryToStart'>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <h3 className={styles.titleScreen}>
            {t.title} <span>{t.titleSpan}</span> {t.titleEnd}
          </h3>
          <div className={styles.borderLine}></div>
          <p className={styles.textDescription}>{t.description}</p>
        </div>

        <div className={styles.cardAndInfo}>
          <div className={styles.cards}>
            <div className={styles.card}>
              <div>
                <div className={styles.headerCard}>
                  <h3 className={styles.title}>{tariff.title}</h3>
                  <div className={styles.mainStatusBlock}>
                    <BsFillHouseFill className={styles.badgeIndicator} />
                    <p className={styles.mainStatus}>{t.mainStatus}</p>
                  </div>
                </div>
                <div className={styles.blockPrice}>
                  <p className={styles.textPrice}>
                    ₴{getDisplayPrice(0)}
                    <span>{t.daysLabel}</span>
                  </p>
                </div>
                <div className={styles.listBlock}>
                  {tariff.list.map((item: any, index: number) => (
                    <div key={index} className={styles.pointListBlock}>
                      <div className={clsx(styles.pointListTextBlock, item.greyColor && styles.greyColor)}>
                        <IoMdCheckmark className={styles.checkmarkIcon} />
                        <h4 className={styles.titleList}>{item.pointTitle}</h4>
                      </div>
                      {item.pointStatus && (
                        <div className={styles.pointListStatusBlock}>
                          {getIcon(item.iconType, styles.pointListBadgeIndicator)}
                          <p className={styles.pointListMainStatus}>{item.pointStatus}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.tagsAndText}>
                <div className={styles.tagBlocks}>
                  <div className={styles.tagBlock}>
                    <p className={styles.tagText}>Apps — iOS/ Android</p>
                  </div>
                </div>
                <div className={styles.textLaterBlock}>
                  <p className={styles.textLater}>{t.comingSoon}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.infoBlock}>
            <div className={styles.infoList}>
              {t.infoList.map((point: string, index: number) => (
                <div key={index} className={styles.infoPointBlock}>
                  <IoMdCheckmark className={styles.infoIcon} />
                  <p className={styles.infoText}>{point}</p>
                </div>
              ))}
              <LangLink to='/register' className={styles.infoButton}>
                {t.tryButton}
                <MdOutlineKeyboardArrowRight className={styles.buttonIcon} />
              </LangLink>
              <LangLink to='/register' className={clsx(styles.infoButton, styles.infoButtonPhone)}>
                {t.loginButton}
                <MdOutlineKeyboardArrowRight className={styles.buttonIcon} />
              </LangLink>
            </div>
          </div>
        </div>
      </div>
      <div className={clsx(styles.neonCircle, styles.bluePrint)}></div>
    </section>
  );
}