'use client';

import { useState, useRef } from 'react';
import styles from './Tariffs.module.scss';
import clsx from 'clsx';
import {
  BsCameraVideo, BsChevronLeft, BsChevronRight,
  BsFillHouseFill, BsHandIndex, BsPersonFill, BsPuzzleFill, BsShopWindow,
} from 'react-icons/bs';
import { IoMdCheckmark } from 'react-icons/io';
import LangLink from '@/components/LangLink/LangLink';

function getIcon(iconType: string | undefined, className: string) {
  if (iconType === 'camera') return <BsCameraVideo className={className} />;
  if (iconType === 'puzzle') return <BsPuzzleFill className={className} />;
  return <BsPersonFill className={className} />;
}

function getStatusIcon(index: number, className: string) {
  if (index === 0) return <BsFillHouseFill className={className} />;
  return <BsShopWindow className={className} />;
}

interface TariffsProps {
  isOn: boolean;
  getDisplayPrice: (price: number) => string;
  tariffs: any[];
}

export default function Tariffs({ isOn, getDisplayPrice, tariffs }: TariffsProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const CARD_WIDTH = 20;
  const GAP = 0.9;
  const VISIBLE_CARDS = 3;
  const safeMaxIndex = Math.max(tariffs.length - VISIBLE_CARDS, 0);

  const slideLeft = () => setCurrentIndex((prev) => (prev === 0 ? safeMaxIndex : prev - 1));
  const slideRight = () => setCurrentIndex((prev) => (prev === safeMaxIndex ? 0 : prev + 1));

  return (
    <div className={styles.sliderWrapper}>
      <button className={clsx(styles.arrow, styles.left)} onClick={slideLeft}>
        <BsChevronLeft className={styles.arrowIcon} />
      </button>
      <div className={styles.sliderViewport} style={{ width: `${VISIBLE_CARDS * CARD_WIDTH + (VISIBLE_CARDS - 1) * GAP}vw` }}>
        <div ref={sliderRef} className={styles.cards} style={{ transform: `translateX(-${currentIndex * (CARD_WIDTH + GAP)}vw)` }}>
          {tariffs.map((info, index) => (
            <div key={index} className={clsx(styles.card, index === 1 && styles.cardPurple)}>
              <div>
                <div className={styles.headerCard}>
                  <h3 className={clsx(styles.title, index === 1 && styles.titlePurple)}>{info.title}</h3>
                  <div className={styles.mainStatusBlock}>
                    {getStatusIcon(index, styles.badgeIndicator)}
                    <p className={styles.mainStatus}>{info.mainStatus}</p>
                  </div>
                </div>
                {index === 0 ? (
                  <div className={styles.blockPrice}>
                    <p className={styles.textPrice}>
                      {isOn && <span className={styles.oldPrice}>₴{info.price}</span>}₴ {getDisplayPrice(info.price)}
                      {!isOn ? <span>{info.perMonth}</span> : <span>{info.perMonthLocation}</span>}
                    </p>
                  </div>
                ) : (
                  <div className={styles.blockPrice}>
                    <p className={styles.textPrice}>
                      {isOn && <span className={styles.oldPrice}>₴{info.price}</span>} ₴ {getDisplayPrice(info.price)}
                      <span>{info.perMonthLocation}</span>
                    </p>
                  </div>
                )}
                <div className={styles.listBlock}>
                  {info.list.map((item: any, idx: number) => (
                    <div key={idx} className={styles.pointListBlock}>
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
                  <p className={styles.textLater}>{info.comingSoon}</p>
                </div>
              </div>
              <div className={styles.buttonBlock}>
                {/* <a href='#' className={clsx(styles.button, index === 2 && styles.buttonPurple)}>
                  <BsHandIndex className={styles.buttonIcon} />
                  {info.buttonText}
                </a> */}
                 <LangLink to='/register' className={clsx(styles.button, index === 2 && styles.buttonPurple)}>
                <BsHandIndex className={styles.buttonIcon} />
                    {info.buttonText}
                </LangLink>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className={clsx(styles.arrow, styles.right)} onClick={slideRight}>
        <BsChevronRight className={styles.arrowIcon} />
      </button>
    </div>
  );
}