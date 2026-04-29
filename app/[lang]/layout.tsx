import { use } from 'react';
import type { Metadata } from 'next';

const langMeta = {
  ua: {
    title: 'CRM для автосервісу з відеоконтролем постів | MECH Orbit',
    description:
      'MECH Orbit — перша в Україні відеоCRM для автосервісу. AI-камери, додаток для механіка та власника авто. Контроль постів, прозорість, прибуток.',
    keywords:
      'CRM для автосервісу, програма для СТО, відеоCRM, облік автосервісу, CRM СТО, керування автосервісом, додаток для механіка',
    ogTitle: 'CRM для автосервісу з відеоконтролем постів | MECH Orbit',
    ogDescription:
      'Перша в Україні відеоCRM для автосервісу: AI-камери, два мобільні додатки, прозорий контроль постів.',
    locale: 'uk_UA',
    canonical: 'https://mechorbit.com/ua',
  },
  ru: {
    title: 'CRM для автосервиса с видеоконтролем постов | MECH Orbit',
    description:
      'MECH Orbit — первая в Украине видеоCRM для автосервиса. AI-камеры, приложение для механика и владельца авто. Контроль постов, прозрачность, прибыль.',
    keywords:
      'CRM для автосервиса, программа для СТО, видеоCRM, учёт автосервиса, CRM СТО, управление автосервисом, приложение для механика',
    ogTitle: 'CRM для автосервиса с видеоконтролем постов | MECH Orbit',
    ogDescription:
      'Первая видеоCRM для автосервиса: AI-камеры, два мобильных приложения, прозрачный контроль постов.',
    locale: 'ru_UA',
    canonical: 'https://mechorbit.com/ru',
  },
  en: {
    title: 'Auto Service CRM with Video Post Control | MECH Orbit',
    description:
      'MECH Orbit — the first video CRM for auto services in Ukraine. AI cameras, mechanic and car owner apps. Post control, transparency, profit.',
    keywords:
      'auto service CRM, car service software, video CRM, auto service management, mechanic app, workshop CRM',
    ogTitle: 'Auto Service CRM with Video Post Control | MECH Orbit',
    ogDescription:
      'First video CRM for auto services: AI cameras, two mobile apps, transparent post control.',
    locale: 'en_US',
    canonical: 'https://mechorbit.com/en',
  },
};

type Lang = 'ua' | 'ru' | 'en';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const l = (langMeta[lang as Lang] ? lang : 'ua') as Lang;
  const m = langMeta[l];

  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords.split(', '),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      locale: m.locale,
      type: 'website',
      url: m.canonical,
      siteName: 'MECH Orbit',
      images: [{ url: 'https://mechorbit.com/mechMetalLogo.jpg' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: m.ogTitle,
      description: m.ogDescription,
      images: ['https://mechorbit.com/mechMetalLogo.jpg'],
    },
    alternates: {
      canonical: m.canonical,
      languages: {
        uk: 'https://mechorbit.com/ua',
        ru: 'https://mechorbit.com/ru',
        en: 'https://mechorbit.com/en',
        'x-default': 'https://mechorbit.com/en',
      },
    },
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = use(params);
  return <div lang={lang}>{children}</div>;
}
