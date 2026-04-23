'use client';

import { useState } from 'react';
import styles from './TariffsScreen.module.scss';
import clsx from 'clsx';
import Tariffs from './Tariffs/Tariffs';
import TryToStartScreen from './TryToStartScreen/TryToStartScreen';
import TariffsTabletAndMobile from './TariffsTabletAndMobile/TariffsTabletAndMobile';

interface TariffsScreenProps {
  t: {
    screen: {
      title: string;
      description: string;
      monthly: string;
      yearly: string;
      discount: string;
    };
    tryToStart: any;
    tariffs: any[];
  };
}

export default function TariffsScreen({ t }: TariffsScreenProps) {
  const [isOn, setIsOn] = useState(false);

  const formatPrice = (value: number) => new Intl.NumberFormat('uk-UA').format(value);

  const getDisplayPrice = (basePrice: number) => {
    if (!isOn) return formatPrice(basePrice);
    return formatPrice(Math.round(basePrice * 0.8));
  };

  const tryToStartT = {
    ...t.tryToStart,
    tariff: t.tariffs[0],
  };

  return (
    <section className={styles.tariffsMain} id='price'>
      <TryToStartScreen isOn={isOn} getDisplayPrice={getDisplayPrice} t={tryToStartT} />

      <div className={styles.container}>
        <div className={styles.textContent}>
          <h3 className={styles.titleScreen}>{t.screen.title}</h3>
          <div className={styles.borderLine}></div>
          <p className={styles.textDescription}>{t.screen.description}</p>

          <div className={styles.descriptionAndButtonChangeBlock}>
            <p className={styles.descriptionChangeBlock}>{t.screen.monthly}</p>
            <div className={clsx(styles.toggleSwitch, isOn ? 'on' : 'off')} onClick={() => setIsOn(!isOn)}>
              <div className={styles.toggleCircle} />
            </div>
            <p className={styles.descriptionChangeBlock}>{t.screen.yearly}</p>
            <div className={styles.discountGradientBlock}>
              <p className={clsx(styles.textDiscount, isOn && styles.textDiscounON)}>
                {t.screen.discount}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={clsx(styles.containerForTariffs, styles.tariffsPc)}>
        <Tariffs isOn={isOn} getDisplayPrice={getDisplayPrice} tariffs={t.tariffs} />
      </div>
      <div className={clsx(styles.containerForTariffs, styles.tariffsTabletAndPhone)}>
        <TariffsTabletAndMobile isOn={isOn} getDisplayPrice={getDisplayPrice} tariffs={t.tariffs} />
      </div>

      <div className={clsx(styles.neonCircle, styles.bluePrint)}></div>
    </section>
  );
}