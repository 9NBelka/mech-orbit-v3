'use client';

import { useEffect, useState } from 'react';
import styles from './TariffsAfterRegister.module.scss';
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
import { useParams } from 'next/navigation';

const API_URL = 'https://api.crmmech.com';

const translations = {
  ua: {
    mainTitle: 'Виберіть пакет:',
    soon: 'скоро',
    appsLabel: 'Apps —',
    testPeriod: '14 днів',
    perMonth: '/міс',
    perLocation: '/міс за локацію',
    features: {
      ai: 'AI‑відео',
      crm: 'CRM / Облік / Склади',
      integration: 'Інтеграція – постачальники',
      mechanic: 'Додаток механіка',
      client: 'Додаток клієнта',
      analytics: 'Аналітика',
      web: 'WEB розширення',
    },
    buttons: {
      free: 'Протестувати',
      start: 'Обрати Start',
      profi: 'Обрати Profi',
      full: 'Обрати Full',
      maximal: 'Обрати Maximal',
      network: 'Обрати Network',
    },
    status: { one: '1 СТО', four: '4 - 8 постів', oneThree: '1 - 3 пости', nine: 'від 9 постів' },
  },
  ru: {
    mainTitle: 'Выберите пакет:',
    soon: 'скоро',
    appsLabel: 'Apps —',
    testPeriod: '14 дней',
    perMonth: '/мес',
    perLocation: '/мес за локацию',
    features: {
      ai: 'AI‑видео',
      crm: 'CRM / Учёт / Склады',
      integration: 'Интеграция – поставщики',
      mechanic: 'Приложение механика',
      client: 'Приложение клиента',
      analytics: 'Аналитика',
      web: 'WEB расширение',
    },
    buttons: {
      free: 'Протестировать',
      start: 'Выбрать Start',
      profi: 'Выбрать Profi',
      full: 'Выбрать Full',
      maximal: 'Выбрать Maximal',
      network: 'Выбрать Network',
    },
    status: { one: '1 СТО', four: '4 - 8 постов', oneThree: '1 - 3 поста', nine: 'от 9 постов' },
  },
  en: {
    mainTitle: 'Choose a package:',
    soon: 'coming soon',
    appsLabel: 'Apps —',
    testPeriod: '14 days',
    perMonth: '/mo',
    perLocation: '/mo per location',
    features: {
      ai: 'AI Video',
      crm: 'CRM / Accounting / Warehouses',
      integration: 'Integration – Suppliers',
      mechanic: 'Mechanic App',
      client: 'Client App',
      analytics: 'Analytics',
      web: 'WEB Extension',
    },
    buttons: {
      free: 'Test for free',
      start: 'Choose Start',
      profi: 'Choose Profi',
      full: 'Choose Full',
      maximal: 'Choose Maximal',
      network: 'Choose Network',
    },
    status: {
      one: '1 Service Station',
      four: '4 - 8 posts',
      oneThree: '1 - 3 posts',
      nine: 'from 9 posts',
    },
  },
};

type Lang = 'ua' | 'ru' | 'en';

function getIcon(type: 'house' | 'shop' | 'camera' | 'person' | 'puzzle', className: string) {
  if (type === 'house') return <BsFillHouseFill className={className} />;
  if (type === 'shop') return <BsShopWindow className={className} />;
  if (type === 'camera') return <BsCameraVideo className={className} />;
  if (type === 'puzzle') return <BsPuzzleFill className={className} />;
  return <BsPersonFill className={className} />;
}

export default function TariffsAfterRegisterPage() {
  const params = useParams();
  const lang = (params?.lang as Lang) || 'ua';
  const workshop_uuid = params?.workshop_uuid as string;
  const t = translations[lang] || translations.ua;

  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [payLoading, setPayLoading] = useState(false);
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    if (!workshop_uuid) {
      setLoading(false);
      return;
    }
    fetch(`${API_URL}/api/v1/workshops/get_owner?workshop_uuid=${workshop_uuid}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed');
        return res.json();
      })
      .then((data) => setEmail(data.email))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [workshop_uuid]);

  const formatPrice = (value: number) => new Intl.NumberFormat('uk-UA').format(value);
  const getDisplayPrice = (basePrice: number) => {
    if (!isOn) return formatPrice(basePrice);
    return formatPrice(Math.round(basePrice * 0.8));
  };

  const handleSelectTariff = async (tariff: { code: string; price: number }) => {
    if (loading || !email) return;
    setPayLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/invoices/create/stripe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_email: email,
          tariff_name: tariff.code,
          amount: tariff.price,
          success_url: 'https://app.crmmech.com/login',
          cancel_url: 'https://app.crmmech.com/login',
        }),
      });
      const data = await res.json();
      if (data.payment_link) window.location.assign(data.payment_link);
    } catch (err) {
      console.error('Stripe error:', err);
    } finally {
      setPayLoading(false);
    }
  };

  const tariffsInfo = [
    {
      code: 'Free',
      title: 'Free',
      mainStatus: t.status.one,
      statusIcon: 'house' as const,
      price: 0,
      buttonText: t.buttons.free,
      list: [
        { title: t.features.ai, greyColor: true },
        { title: t.features.crm, status: '2', icon: 'person' as const },
        { title: t.features.integration, status: '3', icon: 'puzzle' as const },
        { title: t.features.mechanic, status: '2', icon: 'person' as const },
        { title: t.features.client, status: '∞', icon: 'person' as const },
        { title: t.features.analytics },
        { title: t.features.web, greyColor: true },
      ],
    },
    {
      code: 'Start',
      title: 'Start',
      mainStatus: t.status.one,
      statusIcon: 'house' as const,
      price: 990,
      buttonText: t.buttons.start,
      list: [
        { title: t.features.ai, greyColor: true },
        { title: t.features.crm, status: '2', icon: 'person' as const },
        { title: t.features.integration, status: '3', icon: 'puzzle' as const },
        { title: t.features.mechanic, status: '2', icon: 'person' as const },
        { title: t.features.client, status: '∞', icon: 'person' as const },
        { title: t.features.analytics },
        { title: t.features.web, greyColor: true },
      ],
    },
    {
      code: 'Profi',
      title: 'Profi',
      mainStatus: t.status.four,
      statusIcon: 'shop' as const,
      price: 4390,
      buttonText: t.buttons.profi,
      list: [
        { title: t.features.ai, status: '10', icon: 'camera' as const },
        { title: t.features.crm, status: '8', icon: 'person' as const },
        { title: t.features.integration, status: '20', icon: 'puzzle' as const },
        { title: t.features.mechanic, status: '20', icon: 'person' as const },
        { title: t.features.client, status: '∞', icon: 'person' as const },
        { title: t.features.analytics },
        { title: t.features.web },
      ],
    },
    {
      code: 'Full',
      title: 'Full',
      mainStatus: t.status.oneThree,
      statusIcon: 'shop' as const,
      price: 2990,
      buttonText: t.buttons.full,
      list: [
        { title: t.features.ai, status: '4', icon: 'camera' as const },
        { title: t.features.crm, status: '4', icon: 'person' as const },
        { title: t.features.integration, status: '10', icon: 'puzzle' as const },
        { title: t.features.mechanic, status: '6', icon: 'person' as const },
        { title: t.features.client, status: '∞', icon: 'person' as const },
        { title: t.features.analytics },
        { title: t.features.web },
      ],
    },
    {
      code: 'Maximal',
      title: 'Maximal',
      mainStatus: t.status.nine,
      statusIcon: 'shop' as const,
      price: 5890,
      buttonText: t.buttons.maximal,
      list: [
        { title: t.features.ai, status: '∞', icon: 'camera' as const },
        { title: t.features.crm, status: '∞', icon: 'person' as const },
        { title: t.features.integration, status: '∞', icon: 'puzzle' as const },
        { title: t.features.mechanic, status: '∞', icon: 'person' as const },
        { title: t.features.client, status: '∞', icon: 'person' as const },
        { title: t.features.analytics },
        { title: t.features.web },
      ],
    },
    {
      code: 'Network',
      title: 'Network',
      mainStatus: t.status.nine,
      statusIcon: 'shop' as const,
      price: 5290,
      buttonText: t.buttons.network,
      list: [
        { title: t.features.ai, status: '∞', icon: 'camera' as const },
        { title: t.features.crm, status: '∞', icon: 'person' as const },
        { title: t.features.integration, status: '∞', icon: 'puzzle' as const },
        { title: t.features.mechanic, status: '∞', icon: 'person' as const },
        { title: t.features.client, status: '∞', icon: 'person' as const },
        { title: t.features.analytics, status: 'BETA' },
        { title: t.features.web },
      ],
    },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.tariffsContainer}>
      <h2 className={styles.tariffsMainText}>{t.mainTitle}</h2>
      <div className={styles.cards}>
        {tariffsInfo.map((info, index) => (
          <div key={index} className={clsx(styles.card, index === 2 && styles.cardPurple)}>
            <div>
              <div className={styles.headerCard}>
                <h4 className={clsx(styles.title, index === 2 && styles.titlePurple)}>
                  {info.title}
                </h4>
                <div className={styles.mainStatusBlock}>
                  {getIcon(info.statusIcon, styles.badgeIndicator)}
                  <p className={styles.mainStatus}>{info.mainStatus}</p>
                </div>
              </div>

              <div className={styles.blockPrice}>
                {info.price === 0 ? (
                  <p className={styles.textPrice}>
                    ₴{getDisplayPrice(0)}
                    <span>{t.testPeriod}</span>
                  </p>
                ) : (
                  <p className={styles.textPrice}>
                    {isOn && <span className={styles.oldPrice}>₴{info.price}</span>}₴{' '}
                    {getDisplayPrice(info.price)}
                    <span>{index === 0 && !isOn ? t.perMonth : t.perLocation}</span>
                  </p>
                )}
              </div>

              <div className={styles.listBlock}>
                {info.list.map((item, i) => (
                  <div key={i} className={styles.pointListBlock}>
                    <div
                      className={clsx(
                        styles.pointListTextBlock,
                        item.greyColor && styles.greyColor,
                      )}>
                      <IoMdCheckmark className={styles.checkmarkIcon} />
                      <h5 className={styles.titleList}>{item.title}</h5>
                    </div>
                    {item.status && (
                      <div className={styles.pointListStatusBlock}>
                        {item.icon && getIcon(item.icon, styles.pointListBadgeIndicator)}
                        <p className={styles.pointListMainStatus}>{item.status}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.tagsAndText}>
              <div className={styles.tagBlocks}>
                <div className={styles.tagBlock}>
                  <p className={styles.tagText}>{t.appsLabel} iOS/ Android</p>
                </div>
              </div>
              <div className={styles.textLaterBlock}>
                <p className={styles.textLater}>{t.soon}</p>
              </div>
            </div>

            <div className={styles.buttonBlock}>
              <a
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectTariff(info);
                }}
                className={clsx(
                  styles.button,
                  index === 2 && styles.buttonPurple,
                  (payLoading || loading || !email) && styles.disabled,
                )}>
                <BsHandIndex className={styles.buttonIcon} />
                {payLoading ? 'Redirecting...' : info.buttonText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
