import styles from './PublicOfferAgreement.module.scss';

const translations = {
  ua: {
    title: 'Договір публічної оферти',
    titleHighlight: 'MechOrbit',
    description1:
      'Цей документ є офіційною публічною пропозицією MechOrbit укласти договір на умовах, викладених нижче.',
    section1: '1. Загальні положення',
    section1_desc:
      'Акцепт цієї оферти означає повну та безумовну згоду користувача з усіма умовами договору.',
    section2: '2. Предмет договору',
    section2_desc:
      "MechOrbit надає доступ до своїх сервісів, а користувач зобов'язується використовувати їх відповідно до умов договору.",
    section3: "3. Права та обов'язки сторін",
    section3_list: [
      "Користувач зобов'язується надавати достовірну інформацію;",
      'MechOrbit має право змінювати функціонал сервісів;',
      'Користувач не має права порушувати законодавство.',
    ],
    section4: '4. Відповідальність сторін',
    section4_desc: 'Сторони несуть відповідальність відповідно до чинного законодавства.',
    section5: '5. Заключні положення',
    section5_desc: 'Договір набирає чинності з моменту акцепту оферти користувачем.',
    contact: 'Email: forbludov@gmail.com',
  },
  ru: {
    title: 'Договор публичной оферты',
    titleHighlight: 'MechOrbit',
    description1:
      'Настоящий документ является официальным публичным предложением MechOrbit заключить договор на условиях, изложенных ниже.',
    section1: '1. Общие положения',
    section1_desc:
      'Акцепт оферты означает полное и безоговорочное согласие пользователя с условиями договора.',
    section2: '2. Предмет договора',
    section2_desc:
      'MechOrbit предоставляет доступ к своим сервисам, а пользователь обязуется использовать их в соответствии с договором.',
    section3: '3. Права и обязанности сторон',
    section3_list: [
      'Пользователь обязан предоставлять достоверную информацию;',
      'MechOrbit вправе изменять функциональность сервисов;',
      'Пользователю запрещено нарушать законодательство.',
    ],
    section4: '4. Ответственность сторон',
    section4_desc: 'Стороны несут ответственность в соответствии с действующим законодательством.',
    section5: '5. Заключительные положения',
    section5_desc: 'Договор вступает в силу с момента акцепта оферты пользователем.',
    contact: 'Email: forbludov@gmail.com',
  },
  en: {
    title: 'Public Offer Agreement',
    titleHighlight: 'MechOrbit',
    description1:
      'This document is an official public offer by MechOrbit to enter into an agreement under the terms set forth below.',
    section1: '1. General Provisions',
    section1_desc:
      'Acceptance of this offer constitutes full and unconditional agreement with all terms of the Agreement.',
    section2: '2. Subject of the Agreement',
    section2_desc:
      'MechOrbit provides access to its services, and the User agrees to use them in accordance with this Agreement.',
    section3: '3. Rights and Obligations of the Parties',
    section3_list: [
      'The User must provide accurate information;',
      'MechOrbit has the right to modify its services;',
      'The User must comply with applicable laws.',
    ],
    section4: '4. Liability of the Parties',
    section4_desc: 'The parties shall be liable in accordance with applicable law.',
    section5: '5. Final Provisions',
    section5_desc: 'The Agreement enters into force upon acceptance of the offer by the User.',
    contact: 'Email: forbludov@gmail.com',
  },
};

type Lang = 'ua' | 'ru' | 'en';

export default async function PublicOfferPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = translations[lang as Lang] || translations.en;

  return (
    <div className={styles.privacyPolicyMainBlock}>
      <div className={styles.privacyPolicyBlock}>
        <h1 className={styles.privacyPolicyTitle}>
          {t.title} <span>{t.titleHighlight}</span>
        </h1>
        <p className={styles.privacyPolicyDescriptions}>{t.description1}</p>
        <div className={styles.privacyPolicyMainList}>
          <h4 className={styles.privacyPolicyMainListTitle}>{t.section1}</h4>
          <p className={styles.privacyPolicyMainListDescriptions}>{t.section1_desc}</p>
          <h4 className={styles.privacyPolicyMainListTitle}>{t.section2}</h4>
          <p className={styles.privacyPolicyMainListDescriptions}>{t.section2_desc}</p>
          <h4 className={styles.privacyPolicyMainListTitle}>{t.section3}</h4>
          <ul className={styles.privacyPolicyList}>
            {t.section3_list.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <h4 className={styles.privacyPolicyMainListTitle}>{t.section4}</h4>
          <p className={styles.privacyPolicyMainListDescriptions}>{t.section4_desc}</p>
          <h4 className={styles.privacyPolicyMainListTitle}>{t.section5}</h4>
          <p className={styles.privacyPolicyMainListDescriptions}>{t.section5_desc}</p>
          <p className={styles.privacyPolicyMainListDescriptions}>{t.contact}</p>
        </div>
      </div>
    </div>
  );
}
