'use client';

import LangLink from '@/components/LangLink/LangLink';
import styles from './TariffsTabletAndMobile.module.scss';
import clsx from 'clsx';
import {
  BsCameraVideo,
  BsFillHouseFill,
  BsHandIndex,
  BsPersonFill,
  BsPuzzleFill,
  BsShopWindow,
} from 'react-icons/bs';
import { IoMdCheckmark } from 'react-icons/io';

function getIcon(iconType: string | undefined, className: string) {
  if (iconType === 'camera') return <BsCameraVideo className={className} />;
  if (iconType === 'puzzle') return <BsPuzzleFill className={className} />;
  return <BsPersonFill className={className} />;
}

interface TariffsTabletProps {
  isOn: boolean;
  getDisplayPrice: (price: number) => string;
  tariffs: any[];
}

export default function TariffsTabletAndMobile({
  isOn,
  getDisplayPrice,
  tariffs,
}: TariffsTabletProps) {
  return (
    <div className={styles.cards}>
      {tariffs.map((info, index) => (
        <div key={index} className={clsx(styles.card, index === 1 && styles.cardPurple)}>
          <div>
            <div className={styles.headerCard}>
              <h3 className={clsx(styles.title, index === 1 && styles.titlePurple)}>
                {info.title}
              </h3>
              <div className={styles.mainStatusBlock}>
                {index === 0 ? (
                  <BsFillHouseFill className={styles.badgeIndicator} />
                ) : (
                  <BsShopWindow className={styles.badgeIndicator} />
                )}
                <p className={styles.mainStatus}>{info.mainStatus}</p>
              </div>
            </div>
            {index === 0 ? (
              <div className={styles.blockPrice}>
                <p className={styles.textPrice}>
                  {isOn && <span className={styles.oldPrice}>₴{info.price}</span>}₴{' '}
                  {getDisplayPrice(info.price)}
                  {!isOn ? <span>{info.perMonth}</span> : <span>{info.perMonthLocation}</span>}
                </p>
              </div>
            ) : (
              <div className={styles.blockPrice}>
                <p className={styles.textPrice}>
                  {isOn && <span className={styles.oldPrice}>₴{info.price}</span>} ₴{' '}
                  {getDisplayPrice(info.price)}
                  <span>{info.perMonthLocation}</span>
                </p>
              </div>
            )}
            <div className={styles.listBlock}>
              {info.list.map((item: any, idx: number) => (
                <div key={idx} className={styles.pointListBlock}>
                  <div
                    className={clsx(styles.pointListTextBlock, item.greyColor && styles.greyColor)}>
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
            <LangLink
              to='/register'
              className={clsx(styles.button, index === 2 && styles.buttonPurple)}>
              <BsHandIndex className={styles.buttonIcon} />
              {info.buttonText}
            </LangLink>
          </div>
        </div>
      ))}
    </div>
  );
}
